import React from "react";
import ReservationCard from "./ReservationCard";

function ReservationsList({ reservations }) {

  return (
    <div id="reservationGrid" className="row row-cols-3">
      {reservations.map((reservation) => (
        <div className="col-sm" key={reservation.reservation_id}>
            <ReservationCard
              reservation_id={reservation.reservation_id}
              first_name={reservation.first_name}
              last_name={reservation.last_name}
              mobile_number={reservation.mobile_number}
              reservation_date={reservation.reservation_date}
              reservation_time={reservation.reservation_time}
              people={reservation.people}
              status={reservation.status}
            />
          </div>
      ))}
    </div>
  );
}

export default ReservationsList;