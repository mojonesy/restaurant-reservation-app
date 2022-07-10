import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";

function CreateTable() {
  const [error, setError] = useState(null);

  return (
    <main>
      <h1>Create a New Table</h1>
      <ErrorAlert error={error} setError={setError} />
    </main>
  );
}

export default CreateTable;