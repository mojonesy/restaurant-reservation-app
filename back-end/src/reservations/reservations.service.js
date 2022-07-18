const knex = require("../db/connection");

function list(date) {
  return knex("reservations")
    .select("*")
    .where({"reservation_date": date})
    .andWhereNot({"status": "finished"})
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

function update(updatedReservation) {
  return knex("reservations")
    .select("*")
    .where({"reservation_id": updatedReservation.reservation_id})
    .update(updatedReservation, "*")
    .then(updatedRecords => updatedRecords[0]);
}

module.exports = {
    create,
    list,
    read,
    update,
}