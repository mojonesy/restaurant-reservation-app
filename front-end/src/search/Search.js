import React, { useState } from "react";
import ReservationsList from "../reservations/ReservationsList";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";
import "./Search.css";

function Search() {
  const [error, setError] = useState(null);

  const [mobile_number, setMobileNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [reservationMessage, setReservationMessage] = useState("");

  // Change handler //
  const handleChange = ({ target }) => {
    setMobileNumber(target.value);
  }
  // Handle find //
  const handleFind = (event) => {
    event.preventDefault();
    listReservations({ mobile_number })
      .then((reservations) => setReservations(reservations))
      .then(setReservationMessage("No reservations found"))
      .catch((error) => setError(error));
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
          value={mobile_number}
          placeholder="Enter a customer's phone number" 
          aria-label="Enter a customer's phone number" 
          aria-describedby="button-addon2" 
        />
        <button 
          className="btn btn-outline-secondary" 
          type="submit" 
          id="button-addon2"
          onClick={handleFind} 
        >
          Find
        </button>
      </div>

    {/* Reservations */}
    <div className="reservationsList">
      {reservations.length ? 
        <ReservationsList reservations={reservations} />
        :
        <h3>{reservationMessage}</h3>
      }
    </div>

    </main>
  );
}

export default Search;