import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./layout/Layout";
import "./App.css";

/**
 * Defines the root application component.
 * @returns {JSX.Element}
 */
function App() {
  console.log(process.env.REACT_APP_API_BASE_URL);
  return (
    <Switch>
      <Route path="/">
        <Layout />
      </Route>
    </Switch>
  );
}

export default App;
