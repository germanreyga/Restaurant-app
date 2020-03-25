import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Form, Navbar, Nav, Button } from "react-bootstrap";
import axios from "axios";

export class Navigation extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    isLoggedIn: false,
    type: undefined
  };

  componentDidMount() {
    axios
      .get("/user/credentials")
      .then(res => {
        // Changes to type of user login
        this.setState({ isLoggedIn: true, type: res.data.type });
      })
      .catch(err => {
        this.setState({ isLoggedIn: false });
      });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios
      .get("/logout")
      .then(res => {
        this.setState({ isLoggedIn: false });
        window.location.href = "/login";
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoggedIn: true, error: "User couldn't logout" });
      });
  }

  render() {
    return (
      <>
        <Navbar bg="white" expand="lg">
          <Navbar.Brand href="/#">FOOD FACTORY</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto text-center">
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
              <AdminLink type={this.state.type}></AdminLink>
              <EmployeeLink type={this.state.type}></EmployeeLink>
            </Nav>
            <MenuButtons
              isLoggedIn={this.state.isLoggedIn}
              onSubmit={this.handleSubmit}
            />
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

function GuestMenuButtons(props) {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

function UserMenuButtons(props) {
  return (
    <React.Fragment>
      <Form onSubmit={props.onSubmit}>
        <Button type="submit" value="Logout" className="btn btn-orange">
          Logout
        </Button>
      </Form>
    </React.Fragment>
  );
}

function MenuButtons(props) {
  if (props.isLoggedIn) {
    return <UserMenuButtons onSubmit={props.onSubmit} />;
  } else {
    return <GuestMenuButtons onSubmit={props.onSubmit} />;
  }
}

function AdminLink(props) {
  if (
    props.type === undefined ||
    props.type === "client" ||
    props.type === "employee"
  ) {
    return null;
  } else if (props.type === "admin") {
    return (
      <NavLink className="d-inline nav-option admin-link" to="/admin/tools">
        Admin tools
      </NavLink>
    );
  } else {
    return null;
  }
}

function EmployeeLink(props) {
  if (props.type === undefined || props.type === "client") {
    return null;
  } else if (props.type === "admin" || props.type === "employee") {
    return (
      <NavLink
        className="d-inline nav-option employee-link"
        to="/employee/tools"
      >
        Employee tools
      </NavLink>
    );
  } else {
    return null;
  }
}
