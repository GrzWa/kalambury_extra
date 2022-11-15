import React from "react";
import { Link, Route, Switch } from "react-router-dom/";
import SetsEditing from "./SetsEditing/SetsEditing";
import DisplayedSet from "./SetsEditing/DisplayedSet";
import GamesEditing from "./GamesEditing/GamesEditing";
import DisplayedGame from "./GamesEditing/DisplayedGame";
import main from "../main.module.css";
import HomeLogo from "../HomeLogo/HomeLogo";
import Navbar from "../Navbar/Navbar";

export default function Admin() {
  return (
    <>
      {/* <HomeLogo /> */}
      <Navbar />
      <div className={main.topbar}>
        <Link to="/admin/edit_sets">
          <button>Edit sets</button>
        </Link>
        <Link to="/admin/edit_games">
          <button>Edit games</button>
        </Link>
      </div>
      <div className={main.topback}></div>
      
      <Switch>
        <Route exact path="/admin/edit_sets">
          <SetsEditing />
        </Route>
        <Route path="/admin/edit_sets/:set">
          <DisplayedSet />
        </Route>
        <Route exact path="/admin/edit_games/">
          <GamesEditing />
        </Route>
        <Route path="/admin/edit_games/:game">
          <DisplayedGame />
        </Route>
      </Switch>
    </>
  );
}
