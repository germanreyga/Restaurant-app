import React, { Component } from "react";
import { Alert, Card, Form, CardDeck } from "react-bootstrap";
import axios from "axios";

export class FoodMenu extends Component {
  state = {
    food: [],
    cart: [],
    totalprice: 0,
    index: 0,
    cartSubmitSuccess: false,
  };

  componentDidMount() {
    axios
      .get("/food/all")
      .then((res) => {
        this.setState({ food: res.data.data });
      })
      .catch((err) => console.log(err));
  }

  async getUserId() {
    let id = undefined;
    await axios
      .get("/user/credentials")
      .then((res) => {
        id = res.data.user;
      })
      .catch((err) => {
        console.log(err);
      });

    return id;
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Alert variant={"info"}>
            Login to start ordering! <a href="/login">Login</a>{" "}
          </Alert>
          <br />
          <h3>Today's menu</h3>
          <hr />
          <Food food={this.state.food} />
        </div>
      </React.Fragment>
    );
  }
}

function Food(props) {
  const foods = props.food;
  const listFood = foods.map((food, index) => {
    return (
      <div key={index} className="col-auto mb-4">
        <Card
          className="text-justify"
          style={{ width: "18rem", height: "100%" }}
        >
          <Card.Header>{food.category}</Card.Header>
          <Card.Body>
            <Card.Text>{food.name}</Card.Text>
            <Card.Text>
              Price: <b>${food.price} MXN</b>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  });

  return (
    <div className="row justify-content-center">
      <CardDeck>{listFood}</CardDeck>
    </div>
  );
}
