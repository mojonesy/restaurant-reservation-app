import React from "react";
import { removeReservation } from "../utils/api";
import "./TableCard.css";
import { Icon } from '@iconify/react';

function TableCard({
  table_id,
  table_name,
  capacity,
  reservation_id,
  setTablesError,
  loadReservationsAndTables,
}) {

  // Finishes reservation and removes reservation id from table //
  const handleFinish = (event) => {
    event.preventDefault();
    const message = "Is this table ready to seat new guests? This cannot be undone.";
    if (window.confirm(message)) {
      removeReservation(table_id)
        .then(() => loadReservationsAndTables())
        .catch(setTablesError);
    }
  }


  return (
    <>
      <div className="card">
        <div className="card-body">
          <span className="badge capacity-badge">
            <Icon className="people-icon" icon="bi:people" color="#f8f8f4" />
            {capacity}
          </span>

          <h6 className="card-title">{table_name}</h6>
          <p className="card-subtitle mb-2 text-muted">Reservation {reservation_id}</p>
          <div 
            className={`alert ${reservation_id ? "alert-warning" : "alert-success"}`} 
            id="statusWithFinishButton"
            role="alert" 
            data-table-id-status={table_id}>
              {reservation_id ? "Occupied" : "Free"}
              {reservation_id && 
                <button 
                  type="button" 
                  className="btn"
                  id="finishButton"
                  onClick={handleFinish}
                  data-table-id-finish={table_id}>
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