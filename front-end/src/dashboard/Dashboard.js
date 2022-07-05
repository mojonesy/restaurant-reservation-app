import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ReservationCard from "./ReservationCard";
import DateNavButtons from "./DateNavButtons";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  /* If no error is returned from server, display info */
  if (reservationsError === null) {
    return (
      <main>
        <h1>Dashboard</h1>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Reservations for {date}</h4>
        </div>
        
        <div id="reservationGrid" className="row row-cols-1">
          {reservations.map((reservation) => (
            <div className="col">
              <ReservationCard
                reservation_id={reservation.reservation_id}
                first_name={reservation.first_name}
                last_name={reservation.last_name}
                mobile_number={reservation.mobile_number}
                reservation_date={reservation.reservation_date}
                reservation_time={reservation.reservation_time}
                people={reservation.people}
              />
            </div>
          ))}
        </div>

        <div className="dateNav">
          <DateNavButtons currentDate={date} />
        </div>
      </main>
    );
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;
