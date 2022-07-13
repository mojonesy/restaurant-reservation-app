import React from "react";
import { useParams } from "react-router-dom";

function Seat() {
  const reservation_id = useParams().reservation_id;

  return (
    <>
      <h1>Seat</h1>
    </>
  );
}

export default Seat;