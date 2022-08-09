import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";
import "./CreateReservation.css";

function CreateReservation() {
  const history = useHistory();
  const [error, setError] = useState(null);

  // Set initial empty form state //
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };
  const [reservation, setReservation] = useState({ ...initialFormState });

  // Handlers //
  const handleChange = ({ target }) => {
    setReservation({ ...reservation, [target.name]: target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const abortController = new AbortController();
    createReservation(reservation, abortController.signal)
    // Need to slice returned date/time to only display date, because API returns full date/time string
      .then((newReservation) => history.push(`/dashboard?date=${newReservation.reservation_date.slice(0, 10)}`))
      .catch((error) => setError(error));
    
    return () => abortController.abort();
  };


  return (
    <main>
      <div className="d-md-flex flex-column mb-3">
        <h1>Create a New Reservation</h1>
        <ErrorAlert error={error} setError={setError}/>
      </div>
      
      <ReservationForm
        reservation={reservation}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </main>
  );
  }


export default CreateReservation;