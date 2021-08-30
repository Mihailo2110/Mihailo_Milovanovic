import React from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import Login from './components/auth/Login';
import Verify from './components/auth/Verify';
import Home from "./container/home/Home";
import Register from './components/auth/Register';

function App() {
  return (
    <BrowserRouter >
      <Switch>
      <Route path = "/register" component={Register} />
      <Route path = "/home" component={Home} >
        <Home  />
        </Route>
        <Route path = "/verify" component={Verify} />
        <Route exact path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
