import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Home } from "./components/Home";
import Order from "./components/Order";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { AdminDashboard } from "./components/AdminDashboard";
import { EmployeeDashboard } from "./components/EmployeeDashboard";
import { FoodMenu } from "./components/FoodMenu";
import { UserContext } from "./components/context/Context";
import "./css/App.css";
import socketIOClient from "socket.io-client";

function App() {
  const [userInfo, setUserInfo] = useState(true);

  useEffect(() => {
    // Start a web socket globally
    const socket = socketIOClient("/");
  }, []);

  useEffect(() => {
    console.log("STATE: " + userInfo);
  }, [userInfo]);

  return (
    <UserContext.Provider value={[userInfo, setUserInfo]}>
      <BrowserRouter>
        <Navigation />
        <div className="container">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/FoodMenu" component={FoodMenu} />
            <Route path="/client/order" component={Order} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/admin/tools" component={AdminDashboard} />
            <Route path="/employee/tools" component={EmployeeDashboard} />
          </Switch>
        </div>
        <footer className="bg-dark text-white address">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <ul>
                  <span className="text-uppercase">Authors</span>
                  <li>Kevin Ruvalcaba P.</li>
                  <li>Alejandro Moreno L.</li>
                  <li>Germán Reyes G.</li>
                </ul>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <ul className="social">
                  <span>Project's repository</span>
                  <li>
                    <a href="https://github.com/germanreyga/Restaurant-app">
                      <img
                        alt="Qries"
                        src="https://boxboat.com/assets/wf/images/github.9412ae55426a.png"
                        width="50"
                        height="50"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
