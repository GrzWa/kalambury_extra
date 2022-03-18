import React from "react";
import { Switch, Route } from "react-router-dom";
import SpectatorNavi from "./SpectatorNavi";
import SpectatorGame from "./SpectatorGame";

export default function Spectator() {
  return (
    <>
      <Switch>
        <Route exact path="/spectate">
          <SpectatorNavi />
        </Route>
        <Route path="/spectate/:gameID">
          <SpectatorGame />
        </Route>
      </Switch>
    </>
  );
}
