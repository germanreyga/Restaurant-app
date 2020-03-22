import React, { Component } from "react";
import { Card, CardDeck } from "react-bootstrap";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

export class Order extends Component {
  state = {
    food: [],
    totalprice: 0
  };

  componentDidMount() {
    axiosInstance
      .get("/posts")
      .then(res => {
        this.setState({ food: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <br />
          <h3>Cart</h3>
          <hr />
          <Cart totalprice={this.state.totalprice} />
          <br />
          <h3>Food</h3>
          <hr />
          <Food food={this.state.food} />
        </div>
      </React.Fragment>
    );
  }
}

function Food(props) {
  const foods = props.food;
  const listFood = foods.slice(0, 5).map((value, index) => {
    return (
      <div key={value.id} className="col-auto mb-4">
        <Card style={{ width: "18rem", height: "100%" }}>
          <Card.Body>
            <Card.Title>Comida {index}</Card.Title>
            <Card.Text>{value.title}</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">
            <form method="POST" action="/add">
              <div className="form-group row food-form-group ">
                <input
                  type="number"
                  id="qty"
                  name="qty"
                  className="form-control rounded-0"
                  placeholder="Qty."
                  style={{ width: "45%", height: "100%" }}
                  min="1"
                  max="5"
                  required
                />
                <input
                  className="btn-sm btn-primary rounded-0"
                  type="Submit"
                  defaultValue="Add to order"
                />
              </div>
            </form>
          </Card.Footer>
        </Card>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div className="row justify-content-center">
        <CardDeck>{listFood}</CardDeck>
      </div>
    </React.Fragment>
  );
}

function Cart(props) {
  const totalprice = props.totalprice;
  if (totalprice === 0) {
    return <div>No items in your cart</div>;
  } else {
    return <div>{totalprice}</div>;
  }
}
