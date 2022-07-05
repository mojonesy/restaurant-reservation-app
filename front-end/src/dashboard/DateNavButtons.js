import React, { useState } from "react";
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
    console.log(currentDate);
    history.push(`/dashboard?date=${today()}`);
  }
  const handleNext = (event) => {
    event.preventDefault();
    history.push(`/dashboard?date=${next(currentDate)}`);
  }


  return (
    <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button">
     <div class="btn-group" role="group">
      <button 
        type="button" 
        class="btn btn-outline-secondary"
        onClick={handlePrevious}
        >Previous
      </button>
      <button 
        type="button" 
        class="btn btn-outline-secondary"
        onClick={handleToday}
        >Today
      </button>
      <button 
        type="button" 
        class="btn btn-outline-secondary"
        onClick={handleNext}
        >Next
      </button>
     </div>
    </div>
  );
}

export default DateNavButtons;