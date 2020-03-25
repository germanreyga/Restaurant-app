import React, { Component } from "react";
import { Card, Button, Alert, Form, CardDeck, Table } from "react-bootstrap";
import axios from "axios";

export class Order extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
  }

  state = {
    food: [],
    cart: [],
    totalprice: 0,
    index: 0,
    cartSubmitSuccess: false
  };

  componentDidMount() {
    axios
      .get("/food/all")
      .then(res => {
        this.setState({ food: res.data.data });
      })
      .catch(err => console.log(err));
  }

  async handleSubmit(event) {
    event.preventDefault();
    event.persist();

    // Moves the user to the login page if he isn't logged in
    const loggedUserId = await this.getUserId();
    if (loggedUserId === undefined) {
      // Returns to login
      return (window.location.href = "/login");
    }

    /* WARNING: Really hardcoded, needs to change */
    const id = event.target[0].value; // Gets the input with the id
    const name = event.target[1].value; // Gets the input with the name
    const price = event.target[2].value; // Gets the input with the price
    const qty = event.target[3].value; // Gets the input with the quantity
    const price_x_quantity = parseFloat(qty) * parseFloat(price);
    const price_x_quantity_rounded = preciseRound(price_x_quantity, 2);
    const new_cart = this.state.cart;
    new_cart.push({
      id_product: id,
      name: name,
      quantity: qty,
      price: price_x_quantity_rounded
    });

    const oldTotalPrice = this.state.totalprice;
    const newTotalPrice =
      parseFloat(oldTotalPrice) + parseFloat(price_x_quantity);
    const roundedPriceTwoDecimals = preciseRound(newTotalPrice, 2);
    this.setState({
      cart: new_cart,
      totalprice: roundedPriceTwoDecimals
    });

    event.target[3].value = "";
  }

  async handleSubmit2(event) {
    event.preventDefault();
    event.persist();
    // Moves the user to the login page if he isn't logged in
    const loggedUserId = await this.getUserId();
    if (loggedUserId === undefined) {
      // Returns to login
      return (window.location.href = "/login");
    }

    const body = {
      id: loggedUserId,
      cart: this.state.cart
    };

    axios({
      method: "post",
      url: "/order",
      data: body
    })
      .then(res => {
        this.setState({ cart: [], cartSubmitSuccess: true });
        console.log(res);
      })
      .catch(err => {
        this.setState({ cartSubmitSuccess: false });
        console.log(err);
      });
  }

  async getUserId() {
    let id = undefined;
    await axios
      .get("/user/credentials")
      .then(res => {
        id = res.data.user;
      })
      .catch(err => {
        console.log("ERR");
        console.log(err);
      });

    return id;
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <br />
          <h3>Cart</h3>
          <hr />
          <Cart
            totalprice={this.state.totalprice}
            cart={this.state.cart}
            cartSubmitSuccess={this.state.cartSubmitSuccess}
            onSubmit={this.handleSubmit2}
          />
          <br />
          <h3>Food</h3>
          <hr />
          <Food food={this.state.food} onSubmit={this.handleSubmit} />
        </div>
      </React.Fragment>
    );
  }
}

function Food(props) {
  const foods = props.food;
  const listFood = foods.map((value, index) => {
    return (
      <div key={index} className="col-auto mb-4">
        <Card
          className="text-justify"
          style={{ width: "18rem", height: "100%" }}
        >
          <Card.Body>
            <Card.Title>Food #{index}</Card.Title>
            <Card.Text>{value.name}</Card.Text>
            <Card.Text>Price: {value.price} MXN</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">
            <Form onSubmit={props.onSubmit}>
              <div className="form-group food-form-group ">
                <input name="id" defaultValue={value.id_product} hidden />
                <input name="name" defaultValue={value.name} hidden />
                <input name="price" defaultValue={value.price} hidden />
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
                <Button type="submit" className="btn-block rounded btn-dark">
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
    <div className="row justify-content-center">
      <CardDeck>{listFood}</CardDeck>
    </div>
  );
}

function Cart(props) {
  const cart = props.cart;
  if (cart.length > 0) {
    return (
      <CartListItems
        totalprice={props.totalprice}
        cart={props.cart}
        key={0}
        onSubmit={props.onSubmit}
      />
    );
  } else {
    return (
      <React.Fragment>
        <Alert variant="secondary">No items in your cart</Alert>
        <br />
        <CartSubmitStatus cartSubmitSuccess={props.cartSubmitSuccess} />
      </React.Fragment>
    );
  }
}

function CartListItems(props) {
  const cartListItems = props.cart.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.id_product - 1}</td>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
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
      <tr>
        <td colSpan="4">
          <Form onSubmit={props.onSubmit}>
            <Button type="submit" className="btn-sm btn-dark">
              Submit order
            </Button>
          </Form>
        </td>
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

function CartSubmitStatus(props) {
  if (props.cartSubmitSuccess) {
    return <Alert variant={"success"}>Order submitted!</Alert>;
  } else {
    return null;
  }
}

function preciseRound(num, decimals) {
  var t = Math.pow(10, decimals);
  return (
    Math.round(
      num * t +
        (decimals > 0 ? 1 : 0) *
          (Math.sign(num) * (10 / Math.pow(100, decimals)))
    ) / t
  ).toFixed(decimals);
}
