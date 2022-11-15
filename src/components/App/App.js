import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Round from "../Round/Round";
import Navigation from "../Navigation/Navigation";
import Summary from "../Summary/Summary";
import Admin from "../Admin/Admin";
import Spectator from "../Spectator/Spectator";
import SignUp from "../SignUp/SignUp";
import "bootstrap/dist/css/bootstrap.min.css"
import { AuthProvider } from "../../contexts/AuthContext";
import LogIn from "../LogIn/LogIn";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={Navigation} />
            <Route path="/signup">
                <SignUp />
            </Route>
            <Route path="/login">
                <LogIn />
            </Route>
            <Route path="/forgot-password">
                <ForgotPassword />
            </Route>
            <Route path="/round/:gameID" component={Round}/>
            <Route path="/summary/:gameID" component={Summary}/>
            <PrivateRoute path="/admin" component={Admin}/>
            <Route path="/spectate" component={Spectator}/>
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
