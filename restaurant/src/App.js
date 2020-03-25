import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Home } from "./components/Home";
import { Order } from "./components/Order";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { AdminDashboard } from "./components/AdminDashboard";
import { EmployeeDashboard } from "./components/EmployeeDashboard";
import "./css/App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <div className="container">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/client/order" component={Order} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/admin/tools" component={AdminDashboard} />
            <Route path="/employee/tools" component={EmployeeDashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
