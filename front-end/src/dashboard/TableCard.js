import React from "react";
import "./TableCard.css";

function TableCard({
  table_id,
  table_name,
  capacity,
  reservation_id
}) {


  return (
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
              data-table-id-finish={table_id}
              style={{marginLeft: "5px"}}
              >
                Finish
              </button>
            }
        </div>
      </div>
    </div>
  );
}

export default TableCard;