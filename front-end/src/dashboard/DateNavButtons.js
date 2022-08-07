import React from "react";
import { useHistory } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";

function DateNavButtons({ currentDate }) {
  const history = useHistory();

  // Handlers //
  const handlePrevious = (event) => {
    event.preventDefault();
    history.push(`/dashboard?date=${previous(currentDate)}`);
  }
  
  const handleToday = (event) => {
    event.preventDefault();
    history.push(`/dashboard?date=${today()}`);
  }

  const handleNext = (event) => {
    event.preventDefault();
    history.push(`/dashboard?date=${next(currentDate)}`);
  }


  return (
    <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button">
     <div className="btn-group" role="group">
      <button 
        type="button" 
        className="btn btn-outline-light"
        onClick={handlePrevious}>
          Previous
      </button>
      <button 
        type="button" 
        className="btn btn-outline-light"
        onClick={handleToday}>
          Today
      </button>
      <button 
        type="button" 
        className="btn btn-outline-light"
        onClick={handleNext}>
          Next
      </button>
     </div>
    </div>
  );
}

export default DateNavButtons;