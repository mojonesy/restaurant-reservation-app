import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { cancelReservation } from "../utils/api";

function CancelReservationButton({ reservation_id, setReservationsError, loadReservationsAndTables }) {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOk = (event) => {
    event.preventDefault();
    // Want to use modal - come back to this later. //
    const message = "Do you want to cancel this reservation? This cannot be undone.";
    if (window.confirm(message)) {
      cancelReservation(reservation_id, "cancelled")
        .then(() => loadReservationsAndTables())
        // .then(handleClose)
        .catch(setReservationsError);
    }
  };


  return (
    <>
      <button
        type="button"
        className="btn btn-danger"
        // Use handleShow here for modal
        onClick={handleOk}
        data-reservation-id-cancel={reservation_id}>
          Cancel
      </button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Do you want to cancel this reservation?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleOk}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CancelReservationButton;