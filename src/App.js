import React, { useState } from "react";
import Main from "./components/Main/Main";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";

const App = (props) => {
  const [displayName, setDisplayName] = useState(false);
  const [name, setName] = useState("");

  const handleNameChange = (name) => {
    setDisplayName(true);
    if (name !== null) {
      setName(name);
    }
  };

  return (
    <Router>
      <div className="app">
        {displayName ? (
          <div className="top-container">
            <span className="name">Welcome back {name}</span>
          </div>
        ) : null}
      </div>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/home">
          <Main handleNameChange={handleNameChange} />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
