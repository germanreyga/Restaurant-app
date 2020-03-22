import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export class Navigation extends Component {
  render() {
    return (
      <>
        <Navbar bg="white" expand="lg">
          <Navbar.Brand href="/#">FOOD FACTORY</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavLink className="d-inline nav-option home-link" to="/">
                Home
              </NavLink>
              <NavLink
                className="d-inline nav-option order-link"
                to="/client/order"
              >
                Order
              </NavLink>
              <NavLink
                className="d-inline nav-option menu-link"
                to="/client/menu"
              >
                Menu
              </NavLink>
            </Nav>
            <NavLink
              variant="outline-primary"
              className="Nav.Link btn btn-orange"
              to="/login"
            >
              Login
            </NavLink>
            <NavLink
              variant="outline-primary"
              className="Nav.Link btn btn-orange"
              to="/register"
            >
              Register
            </NavLink>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}
