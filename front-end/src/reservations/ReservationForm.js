import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({ reservation, handleSubmit, handleChange }) {
  const history = useHistory();

  return (
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
          value={`${reservation.reservation_time}`}
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
          value={`${reservation.people}`}
          min="1"
          max="8"
          required
        />
      </div>

      <button 
        type="submit"
        className="btn btn-primary btn-lg"
        style={{marginRight: "10px"}}>
          Submit
      </button>
      <button
        type="button"
        className="btn btn-secondary btn-lg"
        onClick={() => history.go(-1)}>
          Cancel
      </button>

    </form>
  );
}

export default ReservationForm;