import React from "react";
import { removeReservation } from "../utils/api";
import "./TableCard.css";

function TableCard({
  table_id,
  table_name,
  capacity,
  reservation_id,
  setTablesError
}) {

  const handleFinish = (event) => {
    event.preventDefault();
    const message = "Is this table ready to seat new guests? This cannot be undone.";
    if (window.confirm(message)) {
      removeReservation(table_id)
        .then(window.location.reload())
        .catch(setTablesError);
    }
  }


  return (
    <>
    <div className="card">
      <div className="card-body">
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
      </div>
    </div>
    </>
  );
}

export default TableCard;



/* This isn't working, but want to try again later */

  // {/* Modal */}
  // {reservation_id &&
  //   <div className="modal fade" id="finishSeatModal" tabIndex={-1} aria-labelledby="finishSeatModal" aria-hidden="true">
  //     <div className="modal-dialog modal-dialog-centered">
  //       <div className="modal-content">
  //         <div className="modal-header">
  //           <h5 className="modal-title" id="finishSeatModal">Is this table ready to seat new guests?</h5>
  //         </div>
  //         <div className="modal-body">
  //           This cannot be undone.
  //         </div>
  //         <div className="modal-footer">
  //           <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
  //           <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleOk}>Ok</button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>}