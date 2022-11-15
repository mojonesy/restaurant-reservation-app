/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";


const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://periodic-tables-backend-lhvm.onrender.com";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservations.
 * @returns {Promise<[reservations]>}
 *  a promise that resolves to a possibly empty array of reservations saved in the database.
 */
export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

/**
 * Saves the reservation to the database.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to the saved reservation, which will now have an 'id' property.
 */
export async function createReservation(reservation, signal) {
  const url = `${API_BASE_URL}/reservations`;
  reservation.people = Number(reservation.people);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: reservation }),
    signal,
  };
  return await fetchJson(url, options, reservation);
}

/**
 * Retrieves a reservation from a given id.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to the reservation.
 */
export async function readReservation(reservation_id, signal) {
  const url = `${API_BASE_URL}/reservations/${reservation_id}`;
  return await fetchJson(url, { signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

/**
 * Removes current reservation_id from table.
 * Changes given reservation status to "finished."
 * Does not return anything.
 */
export async function removeReservation(table_id, signal){
  const url = `${API_BASE_URL}/tables/${table_id}/seat`;
  const options = {
    method: "DELETE",
    signal
  };
  return await fetchJson(url, options);
}

/**
 * Updates existing reservation.
 * 
 * @param updatedReservation
 *  the reservation to update, which must have a 'id' property.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to the updated reservation.
 */
export async function updateReservation(updatedReservation, signal) {
  const url = `${API_BASE_URL}/reservations/${updatedReservation.reservation_id}`;
  updatedReservation.people = Number(updatedReservation.people);
  updatedReservation.reservation_time = updatedReservation.reservation_time.slice(0, 5);
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({data: updatedReservation }),
  };
  return await fetchJson(url, options, updatedReservation);
}

/**
 * Changes given reservation status to "cancelled."
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to the updated reservation, which will now have a status of "cancelled".
 */
export async function cancelReservation(reservation_id, status, signal) {
  const url = `${API_BASE_URL}/reservations/${reservation_id}/status`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({data: { status: status } }),
  };
  return await fetchJson(url, options, { status })
}


/**
 * Retrieves all existing tables.
 * @returns {Promise<[table]>}
 *  a promise that resolves to a possibly empty array of tables saved in the database.
 */
export async function listTables(signal) {
  const url = `${API_BASE_URL}/tables`;
  return await fetchJson(url, { headers, signal }, []);
}

/**
 * Saves the table to the database.
 * @returns {Promise<[table]>}
 *  a promise that resolves to the saved table, which will now have an 'id' property.
 */
export async function createTable(table, signal) {
  const url = `${API_BASE_URL}/tables`;
  table.capacity = Number(table.capacity);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: table }),
    signal,
  };
  return await fetchJson(url, options, table);
};


/**
 * "Seats" a reservation - Updates chosen table with given reservation_id
 * 
 * @param reservation_id
 * reservation_id to add to table - specified in body for tests to pass 
 * @param table_id 
 * table to assign reservation
 * @param updatedTable 
 * table to return from db with newly assigned reservation_id
 * @returns {Promise<[updateTable]>}
 * a promise that resolves to the updated table, which will now have a reservation_id
 */
export async function updateTable(reservation_id, table_id, updatedTable, signal) {
  const url = `${API_BASE_URL}/tables/${table_id}/seat`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: { reservation_id: reservation_id } }),
  };
  return await fetchJson(url, options, updatedTable);
}