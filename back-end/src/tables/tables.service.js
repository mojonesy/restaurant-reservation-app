const knex = require("../db/connection");

function list() {
  return knex("tables")
    .select("*")
    .orderBy("table_name");
}

function create(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then(createdRecords => createdRecords[0]);
}

module.exports = {
    create,
    list,
}