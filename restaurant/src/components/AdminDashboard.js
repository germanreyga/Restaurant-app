import React, { Component } from "react";
import { Button, Form, Alert, Table } from "react-bootstrap";
import axios from "axios";

export class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    inputType: "employee",
    inputStore: 1,
    errors: [],
    success: undefined,
    employees: [],
    stores: []
  };

  async componentDidMount() {
    await this.getAllStores();
    await this.getAllEmployees();
  }

  async getAllStores() {
    await axios
      .get("/stores/all")
      .then(res => {
        this.setState({ stores: res.data.data });
      })
      .catch(err => console.log(err));
  }

  async getAllEmployees() {
    await axios
      .get("/employees/all")
      .then(res => {
        this.setState({ employees: res.data.data });
      })
      .catch(err => console.log(err));
  }

  handleSubmit(event) {
    event.preventDefault();
    this.createUser(this.state);
  }

  async createUser(userinfo) {
    let user = {
      inputUsername: userinfo.inputUsername,
      inputType: userinfo.inputType,
      inputStore: userinfo.inputStore,
      inputPassword: userinfo.inputPassword,
      inputConfirmPassword: userinfo.inputConfirmPassword
    };

    axios({
      method: "post",
      url: "/registerUser",
      data: user
    })
      .then(res => {
        if (res.data.status !== undefined) {
          this.setState({
            success: undefined,
            errors: res.data.message.errors
          });
        } else {
          this.getAllEmployees();
          this.setState({ success: res.data.message, errors: [] });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ success: undefined, errors: err.description });
        console.log(err);
      });
  }

  async handleInputChange(event) {
    // This method lets us control multiple inputs in a form.
    // When an input in a form changes, this.state also updates
    // to form a single source of truth
    const target = event.target;
    const value = target.value;
    const name = target.name;

    await this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="container">
        <br />
        <h3>Add employee</h3>
        <hr />
        <EmployeeForm
          onSubmit={this.handleSubmit}
          state={this.state}
          handleInputChange={this.handleInputChange}
        />
        <br />
        <h3>Employee list</h3>
        <hr />
        <EmployeeList employees={this.state.employees} />
      </div>
    );
  }
}

function EmployeeForm(props) {
  return (
    <Form className="form-signin" onSubmit={props.onSubmit}>
      <div className="form-label-group">
        <label htmlFor="inputUsername">Username</label>
        <input
          id="inputUsername"
          name="inputUsername"
          className="form-control"
          value={props.state.username}
          onChange={props.handleInputChange}
          required
        />
      </div>
      <Form.Group>
        <label htmlFor="inputType">Type</label>
        <select
          id="inputType"
          name="inputType"
          className="form-control"
          value={props.state.type}
          onChange={props.handleInputChange}
          required
        >
          <option value="employee">Employee</option>
          <option value="admin">Administrator</option>
        </select>
      </Form.Group>

      <div className="form-label-group">
        <label htmlFor="inputStore">Related store</label>
        <select
          id="inputStore"
          name="inputStore"
          className="form-control"
          value={props.state.inputStore}
          onChange={props.handleInputChange}
          required
        >
          <StoreList stores={props.state.stores}></StoreList>
        </select>
      </div>

      <div className="form-label-group">
        <label htmlFor="inputPassword">Password</label>
        <input
          type="password"
          id="inputPassword"
          name="inputPassword"
          className="form-control"
          value={props.state.password}
          onChange={props.handleInputChange}
          required
        />
      </div>
      <div className="form-label-group">
        <label htmlFor="inputConfirmPassword">Confirm password</label>
        <input
          type="password"
          id="inputConfirmPassword"
          name="inputConfirmPassword"
          className="form-control"
          value={props.state.hashedpassword}
          onChange={props.handleInputChange}
          required
        />
      </div>
      <br />
      <Success success={props.state.success} />
      <Errors errors={props.state.errors} />
      <br />
      <Button className="btn btn-lg btn-dark btn-block" type="submit">
        Add employee
      </Button>
    </Form>
  );
}

function Success(props) {
  if (props.success !== undefined) {
    return <Alert variant={"success"}>User created successfully</Alert>;
  } else {
    return <div></div>;
  }
}

function Errors(props) {
  if (!props.errors || props.errors.length === 0) {
    return <div></div>;
  }
  return (
    <Alert variant={"danger"}>
      Oops! the following errors were found:
      <ul>
        {props.errors.map((value, index) => {
          return <li key={index}>{value.msg}</li>;
        })}
      </ul>
    </Alert>
  );
}

function StoreList(props) {
  const stores = props.stores;
  const listStores = stores.map((value, index) => {
    return (
      <option key={value.id_store} value={value.id_store}>
        {value.name} ({value.location})
      </option>
    );
  });

  return <React.Fragment>{listStores}</React.Fragment>;
}

function EmployeeList(props) {
  const employees = props.employees;

  if (employees.length > 0) {
    const listEmployees = employees.map((value, index) => {
      return (
        <tr key={value.id_user}>
          <td>{value.id_user}</td>
          <td>{value.username}</td>
          <td>{value.type}</td>
          <td>{value.id_store}</td>
        </tr>
      );
    });

    return (
      <Table striped bordered hover size="sm" className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Type</th>
            <th>Related store id</th>
          </tr>
        </thead>
        <tbody>{listEmployees}</tbody>
      </Table>
    );
  } else {
    return (
      <React.Fragment>
        <div>No employees in the database</div>
        <br />
      </React.Fragment>
    );
  }
}
