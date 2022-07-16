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

function read(table_id) {
  return knex("tables")
    .select("*")
    .where({"table_id": table_id})
    .first();
}

// Read reservation by id in order to update a table //
function readReservation(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({"reservation_id": reservation_id})
    .first();
}

function update(updatedTable) {
  return knex("tables")
    .select("*")
    .where({"table_id": updatedTable.table_id})
    .update(updatedTable, "*")
    .then(updatedRecords => updatedRecords[0]);
}

function removeReservation(table_id) {
  return knex("tables")
    .where({"table_id": table_id})
    .update('reservation_id', null);
}

module.exports = {
    create,
    list,
    read,
    readReservation,
    update,
    removeReservation,
}