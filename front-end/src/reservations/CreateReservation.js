import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function CreateReservation() {
  const history = useHistory();
  const [error, setError] = useState(undefined);
  const [tuesdayError, setTuesdayError] = useState(false);
  const [previousDateError, setPreviousDateError] = useState(false);
  console.log(`Tuesday error: ${tuesdayError}`);
  console.log(`Previous date error: ${previousDateError}`);

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

    const day = new Date(reservation.reservation_date).getUTCDay();
    const date = new Date(reservation.reservation_date).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);
    if (day === 2 && date <= today) {
      setTuesdayError(true);
      setPreviousDateError(true);
      return;
    } else if (date <= today) {
      setPreviousDateError(true);
      return;
    } else if (day === 2) {
      setTuesdayError(true);
      return;
    } else {
      createReservation(reservation)
        .then((newReservation) => history.push(`/dashboard?date=${newReservation.reservation_date}`))
        .catch((error) => setError(error));
    }
  };

  const handleReset = (event) => {
    event.preventDefault();
    setReservation({ ...initialFormState });
    setPreviousDateError(false);
    setTuesdayError(false);
  };


  if (!error) {
    return (
      <main>
        <h1>Create a New Reservation</h1>


        {/* Display reservation creation errors if set to true */}
        <div 
          className="alert alert-danger alert-dismissible fade show" 
          role="alert"
          style={{display: tuesdayError ? "block" : "none"}}>
          <strong>Error</strong>: Cannot make reservation on a Tuesday
          <button 
            type="button" 
            className="close" 
            data-dismiss="alert" 
            aria-label="Close"
            onClick={() => setTuesdayError(false)}
            >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div 
          className="alert alert-danger alert-dismissible fade show" 
          role="alert"
          style={{display: previousDateError ? "block" : "none"}}>
          <strong>Error</strong>: Cannot make reservation on a previous date
          <button 
            type="button" 
            className="close" 
            data-dismiss="alert" 
            aria-label="Close"
            onClick={() => setPreviousDateError(false)}
            >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>


        {/* Reservation Form */}
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="first_name" className="form-label">First Name</label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                className="form-control"
                onChange={handleChange}
                value={reservation.first_name}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="last_name" className="form-label">Last Name</label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                className="form-control"
                onChange={handleChange}
                value={reservation.last_name}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="mobile_number" className="form-label">Mobile Number</label>
            <input
              type="tel"
              name="mobile_number"
              id="mobile_number"
              className="form-control"
              onChange={handleChange}
              value={reservation.mobile_number}
              pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <input 
              type="date"
              name="reservation_date" 
              id="reservation_date"
              className="form-control" 
              onChange={handleChange}
              value={reservation.reservation_date}
              placeholder="YYYY-MM-DD" 
              pattern="\d{4}-\d{2}-\d{2}"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="time" className="form-label">Time</label>
            <input 
              type="time" 
              name="reservation_time"
              id="reservation_time"
              className="form-control" 
              onChange={handleChange}
              value={reservation.reservation_time}
              placeholder="HH:MM" 
              pattern="[0-9]{2}:[0-9]{2}"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="people" className="form-label">Number of Guests</label>
            <input
              type="number"
              name="people"
              id="people"
              className="form-control"
              onChange={handleChange}
              value={reservation.people}
              min="1"
              max="8"
              required
            />
          </div>

          <button 
            type="submit"
            className="btn btn-primary btn-lg"
            style={{marginRight: "10px"}}
          >
            Submit
          </button>
          <button
            type="reset"
            className="btn btn-secondary btn-lg"
            style={{marginRight: "10px"}}
            onClick={handleReset}
          >
            Reset Form
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-lg"
            onClick={() => history.go(-1)}
          >
            Cancel
          </button>

        </form>
      </main>
    );
  }

  return (
    <main>
      <h1>Create a New Reservation</h1>
      <ErrorAlert error={error} />
    </main>
  );
}

export default CreateReservation;