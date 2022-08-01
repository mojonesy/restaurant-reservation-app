import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
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


  // Handlers //
  const handleChange = ({ target }) => {
    setReservation({ ...reservation, [target.name]: target.value });
  }
   
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      updateReservation(reservation)
        .then(history.go(-1));
    } catch (error) {
      setError(error);
    }
  };


  return (
    <main>
      <div className="d-md-flex mb-3">
        <h1>Edit Reservation</h1>
        <ErrorAlert error={error} setError={setError} />
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
              placeholder={reservation.first_name}
              className="form-control"
              onChange={handleChange}
              value={`${reservation.first_name}`}
              required
            />
          </div>
          <div className="col">
            <label htmlFor="last_name" className="form-label">Last Name</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              placeholder={reservation.last_name}
              className="form-control"
              onChange={handleChange}
              value={`${reservation.last_name}`}
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
            placeholder={reservation.mobile_number}
            className="form-control"
            onChange={handleChange}
            value={`${reservation.mobile_number}`}
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
            value={`${reservation.reservation_date}`}
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
            placeholder={reservation.reservation_time}
            className="form-control" 
            onChange={handleChange}
            value={`${reservation.reservation_time}`} 
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
            placeholder={reservation.people}
            className="form-control"
            onChange={handleChange}
            value={`${reservation.people}`}
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

export default EditReservation;