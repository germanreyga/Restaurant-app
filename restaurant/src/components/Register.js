import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import axios from "axios";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    inputUsername: undefined,
    inputType: "client",
    inputPassword: undefined,
    inputConfirmPassword: undefined,
    year: "_",
    errors: [],
    success: undefined
  };

  async componentDidMount() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    this.setState({ year: currentYear });
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

  handleSubmit(event) {
    event.preventDefault();
    this.createUser(this.state);
  }

  createUser(userinfo) {
    let user = {
      inputUsername: userinfo.inputUsername,
      inputType: userinfo.inputType,
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
          this.setState({ success: res.data.message, errors: [] });
        }
      })
      .catch(err => {
        this.setState({ success: undefined, errors: err.description });
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <form className="form-signin" onSubmit={this.handleSubmit}>
          <div className="text-center mb-4">
            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
          <div className="form-label-group">
            <label htmlFor="inputUsername">Username</label>
            <input
              id="inputUsername"
              name="inputUsername"
              className="form-control"
              value={this.state.username}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-label-group">
            <label htmlFor="inputType">Type</label>
            <select
              id="inputType"
              name="inputType"
              className="form-control"
              value={this.state.type}
              onChange={this.handleInputChange}
              required
            >
              <option value="client">Client</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <div className="form-label-group">
            <label htmlFor="inputPassword">Password</label>
            <input
              type="password"
              id="inputPassword"
              name="inputPassword"
              className="form-control"
              value={this.state.password}
              onChange={this.handleInputChange}
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
              value={this.state.hashedpassword}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <br />
          <Success success={this.state.success} />
          <Errors errors={this.state.errors} />
          <br />
          <button className="btn btn-lg btn-orange btn-block" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted text-center">
            © {this.state.year}
          </p>
        </form>
      </div>
    );
  }
}

function Success(props) {
  if (props.success !== undefined) {
    return <Alert variant={"success"}>User created successfully</Alert>;
  } else {
    return <div></div>;
  }
}

function Errors(props) {
  if (props.errors.length === 0) {
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
