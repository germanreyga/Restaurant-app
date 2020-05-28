import React, { useEffect, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Form, Navbar, Nav, Button } from "react-bootstrap";
import { UserCredentialsContext } from "./context/Context";
import { useHistory } from "react-router-dom";

function Navigation() {
  const [isLogged, setIsLogged] = useState(false);
  const [type, setType] = useState("none");
  const [credentials, setCredentials] = useContext(UserCredentialsContext);
  const history = useHistory();

  useEffect(() => {
    setType(credentials.type);
    if (
      credentials.type === "admin" ||
      credentials.type === "employee" ||
      credentials.type === "client"
    ) {
      setIsLogged(true);
    }
  }, [credentials]);

  const handleLogout = (event) => {
    event.preventDefault();
    setCredentials({
      user: "none",
      type: "none",
      id: 0,
    });
    setIsLogged(false);
    history.push("/login");
  };

  return (
    <>
      <Navbar bg="white" expand="lg">
        <Navbar.Brand className="mr-5">
          <p className="text-left brand-logo mt-4">
            Fast
            <br />
            Fruit
          </p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto text-center">
            <NavLink className="d-inline nav-option home-link w-100" to="/">
              Home
            </NavLink>
            <OrderLink isLogged={isLogged}></OrderLink>
            <AdminLink type={type}></AdminLink>
            <EmployeeLink type={type}></EmployeeLink>
          </Nav>

          <div className="access-butons">
            <MenuButtons isLogged={isLogged} onSubmit={handleLogout} />
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

function GuestMenuButtons() {
  return (
    <React.Fragment>
      <NavLink
        variant="outline-primary"
        className="Nav.Link btn btn-orange shadow-lg"
        to="/login"
      >
        Login
      </NavLink>
      <NavLink
        variant="outline-primary"
        className="Nav.Link btn btn-orange shadow-lg"
        to="/register"
      >
        Register
      </NavLink>
    </React.Fragment>
  );
}

function UserMenuButtons(props) {
  if (props.isLogged) {
    return (
      <React.Fragment>
        <Form onSubmit={props.onSubmit}>
          <Button
            type="submit"
            value="Logout"
            className="btn btn-orange shadow-lg"
          >
            Logout
          </Button>
        </Form>
      </React.Fragment>
    );
  } else {
    return;
  }
}

function MenuButtons(props) {
  if (props.isLogged) {
    return (
      <UserMenuButtons isLogged={props.isLogged} onSubmit={props.onSubmit} />
    );
  } else {
    return <GuestMenuButtons onSubmit={props.onSubmit} />;
  }
}

function OrderLink(props) {
  if (props.isLogged === true) {
    return (
      <NavLink
        className="d-inline nav-option order-link w-100"
        to="/client/order"
      >
        Order
      </NavLink>
    );
  } else {
    return (
      <NavLink className="d-inline nav-option menu-link w-100" to="/FoodMenu">
        Menu
      </NavLink>
    );
  }
}

function AdminLink(props) {
  if (
    props.type === "none" ||
    props.type === "client" ||
    props.type === "employee" ||
    props.type === undefined
  ) {
    return null;
  } else if (props.type === "admin") {
    return (
      <NavLink
        className="d-inline nav-option admin-link w-100"
        to="/admin/tools"
      >
        Admin tools
      </NavLink>
    );
  } else {
    return null;
  }
}

function EmployeeLink(props) {
  if (
    props.type === undefined ||
    props.type === "none" ||
    props.type === "client"
  ) {
    return null;
  } else if (props.type === "admin" || props.type === "employee") {
    return (
      <NavLink
        className="d-inline nav-option employee-link w-100"
        to="/employee/tools"
      >
        Employee tools
      </NavLink>
    );
  } else {
    return null;
  }
}

export default Navigation;
