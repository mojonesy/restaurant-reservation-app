import React, { useState } from "react";
import ReservationsList from "../reservations/ReservationsList";
import ErrorAlert from "../layout/ErrorAlert";
import "./Search.css";

function Search() {
  const [error, setError] = useState(null);

  const [mobile, setMobile] = useState("");
  const [reservations, setReservations] = useState([]);

  // Change handler //
  const handleChange = ({ target }) => {
    setMobile(target.value);
  }
  // Handle find //
  const handleFind = (event) => {
    event.preventDefault();
    // run api function
    // set reservations
  }

  return (
    <main>
      <div className="d-md-flex mb-3">
        <h1>Reservation Search</h1>
        <ErrorAlert error={error} setError={setError} />
      </div>

    {/* Search Box */}
      <div className="input-group mb-3" id="mobileSearchBox">
        <input 
          type="text" 
          name="mobile_number"
          className="form-control" 
          onChange={handleChange}
          value={mobile}
          placeholder="Enter a customer's phone number" 
          aria-label="Enter a customer's phone number" 
          aria-describedby="button-addon2" 
        />
        <button 
          className="btn btn-outline-secondary" 
          type="button" 
          id="button-addon2"
          onClick={handleFind} 
        >
          Find
        </button>
      </div>

    {/* Reservations */}
    <div className="reservationsList">
        <ReservationsList reservations={reservations} />
    </div>

    </main>
  );
}

export default Search;