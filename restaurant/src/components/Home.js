import React, { Component } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import Card from "react-bootstrap/Card";
import recycle from "../img/recycle.png";
import food from "../img/food.png";
import organic from "../img/organic.png";
import healthy from "../img/healthy.png";
import "../css/Home.css";

export class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Food Factory</h1>
        <AwesomeSlider className="mt-5 mb-5" bullets={false}>
          <div data-src={require("../img/bg.jpg")} />
          <div data-src={require("../img/ffcups.jpg")} />
          <div data-src={require("../img/ffeat.jpg")} />
        </AwesomeSlider>
        <div className="card-flex">
          <Card style={{ width: "15rem", marginRight: "5rem" }}>
            <Card.Img variant="top" src={recycle} className="card-img" />
            <Card.Body>
              <Card.Title>Eco-friendly</Card.Title>
              <Card.Text>
                We encourage our customers to help the environment by giving
                them eco-friendly materials.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: "15rem", marginRight: "5rem" }}>
            <Card.Img variant="top" src={food} className="card-img" />
            <Card.Body>
              <Card.Title>Great Taste</Card.Title>
              <Card.Text>
                We delight our customers with delicious food, full of taste.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: "15rem", marginRight: "5rem" }}>
            <Card.Img variant="top" src={organic} className="card-img" />
            <Card.Body>
              <Card.Title>Natural Ingredients</Card.Title>
              <Card.Text>
                Our goal is to give our customers the most delicious food made
                with natural ingredients.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: "15rem" }}>
            <Card.Img variant="top" src={healthy} className="card-img" />
            <Card.Body>
              <Card.Title>Healthy Food</Card.Title>
              <Card.Text>
                Apart from our food being delicious and made with natural
                ingredients, it is also healthy.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}
