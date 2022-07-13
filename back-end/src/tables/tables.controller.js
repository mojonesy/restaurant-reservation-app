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
    next({ status: 400, message: "table name must be at least 2 characters"});
  }
  next();
}

function hasValidCapacity(req, res, next) {
  const { capacity } = req.body.data;
  if (capacity < 1 || capacity > 8) {
    next({ status: 400, message: "table capacity must be between 1 and 8 people"});
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
}