import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import axios from "axios";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    inputUsername: undefined,
    inputPassword: undefined,
    year: "_",
    error: undefined
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
    this.loginUser(this.state);
  }

  loginUser(userinfo) {
    let user = {
      inputUsername: userinfo.inputUsername,
      inputPassword: userinfo.inputPassword
    };

    axios({
      method: "post",
      url: "/loginUser",
      data: user
    })
      .then(res => {
        this.setState({ error: undefined });
        window.location.href = "/";
      })
      .catch(err => {
        this.setState({ error: "Incorrect username or password" });
      });
  }

  render() {
    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>
        <div className="text-center mb-4">
          <h1 className="h3 mb-3 font-weight-normal">Login</h1>
          <p>
            You don't have an account? <a href="/register">Register</a>
          </p>
        </div>

        <div className="form-label-group">
          <label htmlFor="inputUsername">Username</label>
          <input
            id="inputUsername"
            name="inputUsername"
            className="form-control"
            placeholder="Username"
            required
            autoFocus=""
            autoComplete="off"
            onChange={this.handleInputChange}
          />
        </div>

        <div className="form-label-group">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            id="inputPassword"
            name="inputPassword"
            className="form-control"
            placeholder="Password"
            required
            autoComplete="off"
            onChange={this.handleInputChange}
          />
        </div>
        <br />
        <Alert variant={"info"}>You need to login to place orders!</Alert>
        <Alert variant={"info"}>
          <ul>
            <li>Master admin username: admin</li>
            <li>Master admin password: admin</li>
          </ul>
        </Alert>
        <Error error={this.state.error} />
        <button className="btn btn-lg btn-orange btn-block" type="submit">
          Login
        </button>
        <p className="mt-5 mb-3 text-muted text-center">© {this.state.year}</p>
      </form>
    );
  }
}

function Error(props) {
  if (props.error === undefined) {
    return <div></div>;
  }
  return <Alert variant={"danger"}>{props.error}</Alert>;
}
