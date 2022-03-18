import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Round from "../Round/Round";
import Navigation from "../Navigation/Navigation";
import Summary from "../Summary/Summary";
import Admin from "../Admin/Admin";
import Spectator from "../Spectator/Spectator";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Navigation />
          </Route>
          <Route path="/round/:gameID">
            <Round />
          </Route>
          <Route path="/summary/:gameID">
            <Summary />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/spectate">
            <Spectator />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
