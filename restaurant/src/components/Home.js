import React, { Component } from "react";
import axios from "axios";

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
        <Comment posts={this.state.posts} />
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
