import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    hello: null
  };

  componentDidMount() {
    axios
      .get("/hello")
      .then(res => this.setState({ hello: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <React.Fragment>
        <h1>Restaurant App</h1>
        <div>
          <h2>Contents of the JSON response after requesting /hello </h2>
          <div>{this.state.hello ? <div> {this.state.hello} </div> : null}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
