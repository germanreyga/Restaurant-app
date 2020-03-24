import React, { Component } from "react";
import { Card, Button, Form, CardDeck, Table } from "react-bootstrap";
import axios from "axios";

export class Order extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    food: [],
    cart: [],
    totalprice: 0,
    index: 0
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(res => {
        this.setState({ food: res.data });
      })
      .catch(err => console.log(err));
  }

  handleSubmit(event) {
    event.preventDefault();
    /* WARNING: Really hardcoded, needs to change */
    const id = event.target[0].value; // Gets the input with the id
    const name = event.target[1].value; // Gets the input with the name
    const price = event.target[2].value; // Gets the input with the price
    const qty = event.target[3].value; // Gets the input with the quantity
    const price_x_quantity = parseFloat(price * qty);
    const new_cart = this.state.cart;
    new_cart.push({ id: id, name: name, qty: qty, price: price_x_quantity });

    const oldTotalPrice = this.state.totalprice;
    const newTotalPrice = oldTotalPrice + price_x_quantity;
    this.setState({ cart: new_cart, totalprice: newTotalPrice });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <br />
          <h3>Cart</h3>
          <hr />
          <Cart totalprice={this.state.totalprice} cart={this.state.cart} />
          <br />
          <h3>Food</h3>
          <hr />
          <Food food={this.state.food} onSubmit={this.handleSubmit} />
        </div>
      </React.Fragment>
    );
  }
}

/* WARNING: still hardcoded */
function Food(props) {
  const foods = props.food;
  const listFood = foods.slice(0, 5).map((value, index) => {
    return (
      <div key={index} className="col-auto mb-4">
        <Card style={{ width: "18rem", height: "100%" }}>
          <Card.Body>
            <Card.Title>Food #{index}</Card.Title>
            <Card.Text>{value.title}</Card.Text>
            <Card.Text>Price: $10.50 MXN</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">
            <Form onSubmit={props.onSubmit}>
              <div className="form-group food-form-group ">
                <input name="id" defaultValue={value.id} hidden />
                <input name="name" defaultValue={value.title} hidden />
                <input name="price" defaultValue={10.5} hidden />
                <input
                  type="number"
                  id="qty"
                  name="qty"
                  className="form-control"
                  placeholder="Qty."
                  style={{ height: "100%" }}
                  min="1"
                  max="5"
                  required
                />
                <Button type="submit" className="btn-block rounded btn-primary">
                  Add to order
                </Button>
              </div>
            </Form>
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
  const cart = props.cart;
  if (cart.length > 0) {
    return (
      <CartListItems totalprice={props.totalprice} cart={props.cart} key={0} />
    );
  } else {
    return <div>No items in your cart</div>;
  }
}

function CartListItems(props) {
  const cartListItems = props.cart.map((item, index) => {
    return (
      <tr key={index}>
        <td> {item.id - 1}</td>
        <td>{item.name}</td>
        <td>{item.qty}</td>
        <td>${item.price} MXN</td>
      </tr>
    );
  });
  cartListItems.push(
    <React.Fragment>
      <tr className="font-weight-bold">
        <td colSpan="3" className="text-center">
          Total price
        </td>
        <td>${props.totalprice} MXN</td>
      </tr>
    </React.Fragment>
  );
  return (
    <Table striped bordered hover size="sm" className="text-center">
      <thead>
        <tr>
          <th>Food #</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{cartListItems}</tbody>
    </Table>
  );
}
