import React from "react";
import ReservationCard from "./ReservationCard";

function ReservationsList({ reservations, setReservationsError, loadReservationsAndTables }) {

  return (
    <div id="reservationGrid" className="row row-cols-1">
      {reservations.map((reservation) => (
        <div className="reservation-card col-sm" key={reservation.reservation_id}>
          <ReservationCard
            reservation_id={reservation.reservation_id}
            first_name={reservation.first_name}
            last_name={reservation.last_name}
            mobile_number={reservation.mobile_number}
            reservation_date={reservation.reservation_date}
            reservation_time={reservation.reservation_time.slice(0, 5)}
            people={reservation.people}
            status={reservation.status}
            setReservationsError={setReservationsError}
            loadReservationsAndTables={loadReservationsAndTables}
          />
        </div>
      ))}
    </div>
  );
}

export default ReservationsList;