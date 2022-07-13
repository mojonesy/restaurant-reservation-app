const knex = require("../db/connection");

function list(date) {
  return knex("reservations")
    .select("*")
    .where({"reservation_date": date})
    .orderBy("reservation_time");
}

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then(createdRecords => createdRecords[0]);
}

function read(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({"reservation_id": reservation_id})
    .first();
}

module.exports = {
    create,
    list,
    read,
}