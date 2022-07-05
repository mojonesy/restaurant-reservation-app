import React from "react";

function ReservationCard(
  { reservation_id, 
    first_name, 
    last_name, 
    mobile_number, 
    reservation_date, 
    reservation_time, 
    people }
) {

    
  return (
    <div className="card border-secondary mb-3" style={{maxWidth: "25rem"}}>
      <h4 className="card-header">{last_name}, {first_name}</h4>
      <div className="card-body">
        <h5 className="card-title">{reservation_time}, {reservation_date}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Guests: {people}</h6>
        <h6 className="card-subtitle mb-2 text-muted">Mobile Number: {mobile_number}</h6>
      </div>
      <div 
        className="card-footer border-secondary text-secondary"
        style={{textAlign: "right"}} >
        Reservation #: {reservation_id}
      </div>
    </div>
  );
}

export default ReservationCard;