import React from "react";
import { cancelReservation } from "../utils/api";

function CancelReservationButton({ reservation_id, setReservationsError, loadReservationsAndTables }) {

  const handleOk = (event) => {
    event.preventDefault();
    const message = "Do you want to cancel this reservation? This cannot be undone.";
    if (window.confirm(message)) {
      cancelReservation(reservation_id, "cancelled")
        .then(() => loadReservationsAndTables())
        .catch(setReservationsError);
    }
  };


  return (
    <>
      <button
        type="button"
        className="btn btn-danger"
        onClick={handleOk}
        data-reservation-id-cancel={reservation_id}>
          Cancel
      </button>
    </>
  );
}

export default CancelReservationButton;