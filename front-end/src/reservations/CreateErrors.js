import React from "react";

function CreateErrors({ tuesdayError, setTuesdayError, previousDateError, setPreviousDateError }) {
  return (
    <>
    <div 
      className="alert alert-danger alert-dismissible fade show" 
      role="alert"
      style={{display: tuesdayError ? "block" : "none"}}
    >
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
      style={{display: previousDateError ? "block" : "none"}}
    >
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
    </>
  );
}

export default CreateErrors;