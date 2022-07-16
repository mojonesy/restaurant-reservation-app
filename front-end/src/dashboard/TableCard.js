import React, { useState } from "react";
import { removeReservation, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import "./TableCard.css";

function TableCard({
  table_id,
  table_name,
  capacity,
  reservation_id
}) {

  const [error, setError] = useState(null);

  const handleFinish = () => {
    if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
        removeReservation(table_id)
          .then(window.location.reload());
      }
  }


  return (
    <>
    <div className="card">
      <div className="card-body">
        <ErrorAlert error={error} setError={setError} />
        <span className="badge bg-info">{capacity}</span>
        <h6 className="card-title">{table_name}</h6>
        <p className="card-subtitle mb-2 text-muted">Reservation #{reservation_id}</p>
        <div 
          className={`alert ${reservation_id ? "alert-warning" : "alert-success"}`} 
          role="alert" 
          data-table-id-status={table_id}
        >
          {reservation_id ? "Occupied" : "Free"}
          {reservation_id && 
            <button 
              type="button" 
              className="btn btn-dark"
              onClick={handleFinish}
              data-table-id-finish={table_id}
              style={{marginLeft: "5px"}}
              >
                Finish
              </button>
            }
        </div>
        {/* <div className="modal fade" id="finishSeatModal" tabIndex={-1} aria-labelledby="finishSeatModal" aria-hidden="true">
          <div className="modal-dialog modal-dialog-center">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="finishSeatModal">Title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Body
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary">Ok</button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
    </>
  );
}

export default TableCard;