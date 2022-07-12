import React, { useState, useEffect } from "react";
import TableCard from "./TableCard";
import ErrorAlert from "../layout/ErrorAlert";

function TablesList({ tables, tablesError }) {

  return (
    <>
      <ErrorAlert error={tablesError} />

      <div id="tableGrid" className="row row-cols-2">
        {tables.map((table) => (
          <div className="col" key={table.table_id}>
            <TableCard />
          </div>
        ))}
      </div>
    </>
  );
}

export default TablesList;