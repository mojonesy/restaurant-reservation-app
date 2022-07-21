import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ReservationsList from "../reservations/ReservationsList";
import TableCard from "./TableCard";
import DateNavButtons from "./DateNavButtons";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 */
function Dashboard({ date }) {
  
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  // Load Dashboard - reservations and tables //
  useEffect(() => {
    loadReservationsAndTables();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  function loadReservations() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  }

  function loadReservationsAndTables() {
    const abortController = new AbortController();
    loadReservations();
    loadTables();
    return () => abortController.abort();
  }


    return (
      <main>
        <h1>Dashboard</h1>
        <div className="d-md-flex flex-column mb-3">
          {!reservations.length && <h2>No reservations on this date.</h2>}
          <h4 className="mb-0">Reservations for {date}</h4>
        </div>
        <ErrorAlert error={reservationsError} setError={setReservationsError} />

        {/* Reservations */}
        <div className="reservationsList">
          <ReservationsList reservations={reservations} />
        </div>

        <div className="dateNav" style={{marginBottom: "17px"}}>
          <DateNavButtons currentDate={date} />
        </div>

        {/* Tables */}
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Tables</h4>
        </div>
        <ErrorAlert error={tablesError} setError={setTablesError} />
        <div id="tableGrid" className="row row-cols-4">
          {tables.map((table) => (
            <div className="col-sm-3" key={table.table_id}>
              <TableCard
                table_id={table.table_id}
                table_name={table.table_name}
                capacity={table.capacity}
                reservation_id={table.reservation_id}
                setTablesError={setTablesError}
                loadReservations={loadReservations}
              />
            </div>
          ))}
        </div>
      </main>
    );
}

export default Dashboard;
