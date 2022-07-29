import React from "react";
import { Button, Modal } from "react-bootstrap";

function CancelReservationButton({ reservation_id }) {
  return (
    <>
      <button
        type="button"
        className="btn btn-danger"
        data-reservation-id-cancel={reservation_id}
      >
        Cancel
      </button>
    </>
  );
}

export default CancelReservationButton;