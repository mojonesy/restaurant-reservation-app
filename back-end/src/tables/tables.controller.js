const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for table resources
 */
async function list(req, res, next) {
  const data = await service.list();
  res.json({ data });
}

/**
 * Check data for valid properties
 */
const VALID_PROPERTIES = [
  "table_name",
  "capacity",
  "reservation_id"
];

function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: "Body must have data property"});
}

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidProperties = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );
  if (invalidProperties.length) {
    next({ status: 400, message: `Invalid field(s): ${invalidProperties.join(", ")}` });
  }
  next();
}

function hasProperties(...properties) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    try {
      properties.forEach((property) => {
        if(!data[property]) {
          const error = new Error(`A ${property} property is required`);
          error.status = 400;
          throw error;
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

function tableNameHasValidLength(req, res, next) {
  const { table_name } = req.body.data;
  if (table_name.length < 2) {
    next({ status: 400, message: "table_name must be at least 2 characters"});
  }
  next();
}

function hasValidCapacity(req, res, next) {
  const { capacity } = req.body.data;
  if (capacity < 1 || typeof capacity !== "number") {
    next({ status: 400, message: "table capacity must be at least 1 person" });
  }
  next();
}

/**
 * Create new table handler
 */
async function create(req, res, next){
  const data = await service.create(req.body.data);
  console.log("data:", data);
  res.status(201).json({ data: data });
}


/**
 * Check for valid properties before updating table
 */
async function reservationExists(req, res, next) {
 const { reservation_id } = req.body.data;
 const reservation = await service.readReservation(reservation_id);
 if (reservation) {
   res.locals.reservation = reservation;
   return next();
 }
 next({ status: 404, message: `reservation ${reservation_id} does not exist` });
}

async function tableExists(req, res, next) {
  const table_id = req.params.table_id;
  const table = await service.read(table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({ status: 404, message: `table ${table_id} does not exist` });
}

function tableHasSufficientCapacity(req, res, next) {
  const people = res.locals.reservation.people;
  const capacity = res.locals.table.capacity;
  if (people > capacity) {
    return next({ status: 400, message: "number of people in reservation exceeds table capacity" });
  }
  next();
}

function tableIsOccupied(req, res, next) {
  const reservation_id = res.locals.table.reservation_id;
  if (reservation_id) {
    return next({ status: 400, message: "table is already occupied" });
  }
  next();
}

function tableIsNotOccupied(req, res, next) {
  const reservation_id = res.locals.table.reservation_id;
  if (!reservation_id) {
    return next({ status: 400, message: "table is not occupied" });
  }
  next();
}

function reservationisAlreadySeated(req, res, next) {
  const currentStatus = res.locals.reservation.status;
  if (currentStatus && currentStatus === "seated") {
    return next({ status: 400, message: "table is already seated" });
  }
  next();
}

/**
 * Update table handler
 * Adds reservation_id to table
 * Changes reservation status to "seated"
 */
async function seatReservation(req, res) {
  const updatedTable = {
    ...req.body.data,
    table_id: res.locals.table.table_id,
  };
  const updatedReservation = {
    ...res.locals.reservation,
    status: "seated",
  }
  const data = await service.update(updatedTable, updatedReservation);
  res.json({ data });
}

/**
 * Retrieve reservation to remove from table (see below)
 */
async function getReservation(req, res, next) {
  const reservation_id = res.locals.table.reservation_id;
  const reservation = await service.readReservation(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({ status: 404, message: `reservation ${reservation_id} not found` });
}

/**
 * Removes reservation_id from table
 * Changes reservation status to "finished"
 */
async function removeReservation(req, res) {
  const table = res.locals.table;
  const updatedTable = {
    ...table,
    reservation_id: null,
  };
  const updatedReservation = {
    ...res.locals.reservation,
    reservation_id: res.locals.reservation.reservation_id,
    status: "finished",
  }
  const data = await service.update(updatedTable, updatedReservation);
  res.json({ data });
}


module.exports = {
    create: [
      hasData,
      hasOnlyValidProperties,
      hasProperties("table_name", "capacity"),
      tableNameHasValidLength,
      hasValidCapacity,
      asyncErrorBoundary(create),
    ],
    list: asyncErrorBoundary(list),
    seatReservation: [
      asyncErrorBoundary(tableExists),
      hasData,
      hasProperties("reservation_id"),
      asyncErrorBoundary(reservationExists),
      reservationisAlreadySeated,
      tableHasSufficientCapacity,
      tableIsOccupied,
      asyncErrorBoundary(seatReservation),
    ],
    removeReservation: [
      asyncErrorBoundary(tableExists), 
      tableIsNotOccupied,
      asyncErrorBoundary(getReservation),
      asyncErrorBoundary(removeReservation),
    ],
}