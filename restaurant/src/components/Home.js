import React, { Component } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

export class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Food Factory</h1>
        <AwesomeSlider>
          <div data-src={require("../bg.jpg")} />
          <div data-src={require("../ffcups.jpg")} />
          <div data-src={require("../ffeat.jpg")} />
        </AwesomeSlider>
      </React.Fragment>
    );
  }
}
