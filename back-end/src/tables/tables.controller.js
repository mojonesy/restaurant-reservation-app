const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for table resources
 */
async function list(req, res, next) {
  const data = await service.list();
  res.json({ data });
}


module.exports = {
    list: asyncErrorBoundary(list),
}