const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const data = await service.list(req.query.date);
  res.json({ data });
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

/**
 * Create new reservation handler
 */
async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}


module.exports = {
  create: [
    hasData,
    hasOnlyValidProperties,
    hasProperties("last_name", "mobile_number", "reservation_date", "reservation_time", "people"),
    asyncErrorBoundary(create),
  ],
  list: asyncErrorBoundary(list),
};
