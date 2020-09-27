import React from "react";
import Main from "./components/Main/Main";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";

const App = (props) => {
  return (
    <Router>
      <div className="app"></div>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/home">
          <Main />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
