import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import { Card, Image } from "react-bootstrap";
import recycle from "../img/recycle.png";
import food from "../img/food.png";
import organic from "../img/organic.png";
import healthy from "../img/healthy.png";
import smoothie from "../img/smoothie.png";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import "../css/Home.css";

function Home() {
  const history = useHistory();

  return (
    <React.Fragment>
      <h1 className="text-left home-title mt-4">
        Fast
        <br />
        Fruit
      </h1>
      <p className="home-subtitle">
        Eating healthy has never been more <span>delicious!</span>
      </p>

      <div className="gradient-line-main" />
      <AwesomeSlider
        className="mt-5 shadow-sm p-3 bg-white rounded"
        bullets={true}
      >
        <div data-src={require("../img/slider-1.jpg")} />
        <div data-src={require("../img/ffeat.jpg")} />
        <div data-src={require("../img/ffcups.jpg")} />
        <div data-src={require("../img/bg.jpg")} />
        <div data-src={require("../img/slider-7.jpg")} />
      </AwesomeSlider>
      <Description />
      <div className="jumbotron jumbotron-fluid know-us shadow-lg ">
        <div className="container">
          <h2 className="text-center text-uppercase">
            What we offer in each food
          </h2>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <InfoCards />
      </div>
      <div className="d-flex justify-content-center">
        <Button
          className="btn-green shadow-lg"
          variant="primary"
          onClick={() => {
            history.push("/FoodMenu");
          }}
        >
          Check out the menu!
        </Button>
      </div>
    </React.Fragment>
  );
}

function Description() {
  return (
    <div className="row">
      <div className="col-lg-5 text-center">
        <Image src={smoothie} fluid />
      </div>
      <div className="col-lg-7 text-center info-panel">
        <h4>
          <b>Who are we?</b>
        </h4>
        <p>
          We are a concept of healthy fast food restaurants that adapt to the
          needs of the modern lifestyle, offering our customers practical and
          economical options. We offer a menu with delicious, customizable food
          that is as healthy as the customer wants it to be, prepared on the
          spot with the freshest ingredients.
        </p>
      </div>
    </div>
  );
}

function InfoCards() {
  return (
    <div className="info-cards">
      <div className="row">
        <Card className="col-lg-3 col-md-5 col-xs-5 card-eco shadow-sm p-3 mb-5 bg-white rounded">
          <Card.Img variant="top" src={organic} className="card-img" />
          <Card.Body>
            <Card.Title>Eco-friendliness</Card.Title>
            <Card.Text>
              We encourage our customers to help the environment by giving them
              eco-friendly materials.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="col-lg-3 col-md-5 col-xs-5 card-taste shadow-sm p-3 mb-5 bg-white rounded">
          <Card.Img variant="top" src={food} className="card-img" />
          <Card.Body>
            <Card.Title>Great Taste</Card.Title>
            <Card.Text>
              We delight our customers with delicious food, full of taste.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="col-lg-3 col-md-5 col-xs-5 card-ingredients shadow-sm p-3 mb-5 bg-white rounded">
          <Card.Img variant="top" src={recycle} className="card-img" />
          <Card.Body>
            <Card.Title>Natural Ingredients</Card.Title>
            <Card.Text>
              Our goal is to give our customers the most delicious food made
              with natural ingredients.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="col-lg-3 col-md-5 col-xs-5 card-healthy shadow-sm p-3 mb-5 bg-white rounded">
          <Card.Img variant="top" src={healthy} className="card-img" />
          <Card.Body>
            <Card.Title>Health</Card.Title>
            <Card.Text>
              Apart from our food being delicious and made with natural
              ingredients, it is also healthy.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Home;
