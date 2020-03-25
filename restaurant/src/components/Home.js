import React, { Component } from "react";
import axios from "axios";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

export class Home extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    axiosInstance
      .get("/posts")
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <React.Fragment>
        <h1>Restaurant App</h1>
        <AwesomeSlider>
          <div data-src={require("../bg.jpg")} />
          <div data-src={require("../ffcups.jpg")} />
          <div data-src={require("../ffeat.jpg")} />
        </AwesomeSlider>
      </React.Fragment>
    );
  }
}

function Comment(props) {
  return (
    <ul>
      {props.posts.map((value, index) => {
        return (
          <li key={index}>
            {value.userId}, {value.id}, {value.title}
          </li>
        );
      })}
    </ul>
  );
}
