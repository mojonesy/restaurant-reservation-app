import React from "react";
import TableCard from "./TableCard";

function TablesList({ tables, setTablesError, loadReservationsAndTables }) {
  
  return (
    <div id="tableGrid" className="tables-grid">
      {tables.map((table) => (
        <div className="tables-card" key={table.table_id}>
          <TableCard
            table_id={table.table_id}
            table_name={table.table_name}
            capacity={table.capacity}
            reservation_id={table.reservation_id}
            setTablesError={setTablesError}
            loadReservationsAndTables={loadReservationsAndTables}
          />
        </div>
      ))}
    </div>
  );
}

export default TablesList;