const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { today } = require("../utils/date-time");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  if (req.query.date) {
    const data = await service.list(req.query.date);
    res.json({ data });
  } else {
    const data = await service.list(today());
    res.json({ data });
  }
}

/**
 * Check for data and valid properties
 */
const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
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
    next({ status: 400, message: `Invalid field(s): ${invalidProperties.join(", ")}`});
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

function hasValidDate(req, res, next) {
  const { data: { reservation_date } = {} } = req.body;
  const dateRegex = new RegExp(/(?<=\D|^)(?<year>\d{4})(?<sep>[^\w\s])(?<month>1[0-2]|0[1-9])\k<sep>(?<day>0[1-9]|[12][0-9]|(?<=11\k<sep>|[^1][4-9]\k<sep>)30|(?<=1[02]\k<sep>|[^1][13578]\k<sep>)3[01])(?=\D|$)/gm);
  if (!reservation_date.match(dateRegex)) {
    next({ status: 400, message: "reservation_date must be a valid date"});
  }
  next();
}

function hasValidTime(req, res, next) {
  const { reservation_time } = req.body.data;
  const timeRegex = new RegExp(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);
  if (reservation_time && reservation_time !== "" && reservation_time.match(timeRegex)) {
    next();
  } else {
    next({ status: 400, message: "reservation_time must be a valid time"});
  }
}

function peopleIsNumber(req, res, next) {
  const { data: { people } = {} } = req.body;
  if (!Number.isInteger(people)) {
    next({ status: 400, message: "people must be a number"});
  }
  next();
}

function dateIsNotTuesday(req, res, next) {
  const { reservation_date } = req.body.data;
  const dateString = reservation_date.split("-");
  const numDate = new Date(
    Number(dateString[0]),
    Number(dateString[1]) - 1,
    Number(dateString[2]),
    0,
    0,
    1
  );
  if (numDate.getDay() === 2) {
    next({ status: 400, message: "restaurant closed on Tuesdays" });
  } else {
    next();
  }
}

function dateIsNotPast(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const [hour, minute] = reservation_time.split(":");
  let [year, month, date] = reservation_date.split("-");
  month -= 1;
  const reservationDate = new Date(year, month, date, hour, minute, 59, 59);
  const today = new Date();

  if (today <= reservationDate) {
    return next();
  }
  return next({
    status: 400,
    message: `reservation_date must be set in the future`,
  });
};

function isAfterPresentTime(req, res, next) {
  const { reservation_time, reservation_date } = req.body.data;
  const nowInMilliseconds = new Date().getTime();
  const dateTime = reservation_date.concat(' ', reservation_time);
  const resInMilliseconds = new Date(dateTime).getTime();
  if (resInMilliseconds && resInMilliseconds !== "" && (resInMilliseconds > nowInMilliseconds)) {
    next();
  } else {
    next({ status: 400, message: "reservation time must be in the future "});
  }
}

/**
 * Create new reservation handler
 */
async function create(req, res) {
  const data = await service.create(req.body.data);
  console.log("data", data);
  res.status(201).json({ data: data });
}


module.exports = {
  create: [
    hasData,
    hasOnlyValidProperties,
    hasProperties("first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people"),
    hasValidDate,
    peopleIsNumber,
    hasValidTime,
    dateIsNotTuesday,
    dateIsNotPast,
    asyncErrorBoundary(create),
  ],
  list: asyncErrorBoundary(list),
};
