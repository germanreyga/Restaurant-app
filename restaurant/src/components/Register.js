import React, { Component } from "react";

export class Register extends Component {
  state = {
    year: null
  };

  async componentDidMount() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    this.setState({ year: currentYear });
  }

  render() {
    return (
      <div className="container-fluid">
        <form className="form-signin" method="POST" action="/registerUser">
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
              required
            />
          </div>
          <div className="form-label-group">
            <label htmlFor="inputType">Type</label>
            <select
              id="inputType"
              name="inputType"
              className="form-control"
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
              required
            />
          </div>
          <br />
          <button className="btn btn-lg btn-orange btn-block" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted text-center">
            © {this.state.year}{" "}
          </p>
        </form>
      </div>
    );
  }
}
