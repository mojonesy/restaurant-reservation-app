import React from "react";

/**
 * Defines the alert message to render if the specified error is truthy.
 * @param error
 *  an instance of an object with `.message` property as a string, typically an Error instance.
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */

function ErrorAlert({ error, setError }) {
  return (
    error && (
      <div 
        className="alert alert-danger m-2 alert-dismissible fade show"
        role="alert"
      >
        <strong>Error</strong>: {error.message}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={() => setError(false)}
        >
        <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  );
}

export default ErrorAlert;
