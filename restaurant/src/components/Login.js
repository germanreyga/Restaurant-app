import React, { useContext, useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { UserCredentialsContext } from "./context/Context";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [year, setYear] = useState("_");
  const [error, setError] = useState(undefined);
  const [credentials, setCredentials] = useContext(UserCredentialsContext);

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    setYear(currentYear);
  }, []);

  useEffect(() => {}, [credentials]);

  const handleInputChange = async (event) => {
    // This method lets us control multiple inputs in a form.
    // When an input in a form changes, this.state also updates
    // to form a single source of truth
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === "inputUsername") {
      setUsername(value);
    }
    if (name === "inputPassword") {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(username, password);
  };

  const loginUser = (username, password) => {
    let user = {
      inputUsername: username,
      inputPassword: password,
    };

    axios({
      method: "post",
      url: "/loginUser",
      data: user,
    })
      .then((res) => {
        setError(undefined);
        setCredentials(res.data);
        history.push("/");
      })
      .catch((err) => {
        setError("Incorrect username or password");
      });
  };

  return (
    <form className="form-signin" onSubmit={handleSubmit}>
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
        />
      </div>
      <br />
      <Alert variant={"info"}>
        <ul>
          <li>Master admin username: admin</li>
          <li>Master admin password: admin</li>
        </ul>
      </Alert>
      <Error error={error} />
      <button
        className="btn btn-lg btn-orange btn-block"
        type="submit"
        id="sendCredentials"
      >
        Login
      </button>
      <p className="mt-5 mb-3 text-muted text-center">© {year}</p>
    </form>
  );
}

function Error(props) {
  if (props.error === undefined) {
    return <div></div>;
  }
  return <Alert variant={"danger"}>{props.error}</Alert>;
}

export default Login;
