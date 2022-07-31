import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function EditReservation() {
  const history = useHistory();
  const reservation_id = useParams().reservation_id;

  const [error, setError] = useState(null);
  const [reservation, setReservation] = useState("");

  // Load reservation by id //
  useEffect(() => {
    async function loadReservation() {
      const response = await readReservation(reservation_id);
      setReservation(response);
    }
    loadReservation();
  }, [reservation_id]);

  return (
    <main>
      <div className="d-md-flex mb-3">
        <h1>Edit Reservation</h1>
        <ErrorAlert error={error} setError={setError} />
      </div>
    </main>
  );
}

export default EditReservation;