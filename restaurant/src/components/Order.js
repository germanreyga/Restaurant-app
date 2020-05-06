import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Alert, Form, CardDeck, Table } from "react-bootstrap";
import { OrderListContext } from "./context/Context";
import axios from "axios";
import {distance, preciseRound} from '../constants/Functions';

function Order(props) {
  const notifyNewOrder = props.notifyNewOrder;
  const setNotifyNewOrder = props.setNotifyNewOrder;
  const [orderList, setOrderList] = useContext(OrderListContext);
  const [cart, setCart] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [order, setOrder] = useState({
    totalprice: 0,
    index: 0,
    cartSubmitSuccess: false,
  });

  useEffect(() => {
    setOrder({
      totalprice: 0,
      index: 0,
      cartSubmitSuccess: false,
    });

    axios
      .get("/food/all")
      .then((res) => {
        setFoodList(res.data.data);
      })
      .catch((err) => console.log(err));
      var userCoordinates = []
      //API to get user latitude and longitud
      axios('https://freegeoip.app/json/')
        .then((res) => { 
          userCoordinates = [res.data.latitude, res.data.longitude];
          return userCoordinates;
          //find which sotre is closes to the user
        })
        .catch((err) => {
          //This usually fails if the user has addblock or some other 
          //similar extension. Default value then is Disney's  
          userCoordinates = [19.2853, -99.141301];
          console.log(err)
          return userCoordinates;
        }).then((userCoordinates)=> {
          axios("/stores/all").then((res) => {
            var orderedStores = [];
            res.data.data.forEach(store => {
              let holder = distance(userCoordinates[0], userCoordinates[1], store.latitude,store.longitude, 'K');
              orderedStores.push({
                name: `${store.name}: (${store.location})`,
                distance: holder,
                id_store: store.id_store
              });
            });
            orderedStores.sort((a,b) => {
              return a.distance - b.distance;
            });
            setStoreList(orderedStores);
            }).catch((err) => { console.log(err);});
        });

      

  }, []);

  const addToCart = async (event) => {
    event.preventDefault();
    event.persist();

    // Moves the user to the login page if he isn't logged in
    const loggedUserId = await getUserId();
    if (loggedUserId === undefined) {
      // Returns to login
      return (window.location.href = "/login");
    }

    const id = event.target.id.value; // Gets the input with the id
    const name = event.target.name.value; // Gets the input with the name
    const price = event.target.price.value; // Gets the input with the price
    const qty = event.target.qty.value; // Gets the input with the quantity
    const price_x_quantity = parseFloat(qty) * parseFloat(price);
    const price_x_quantity_rounded = preciseRound(price_x_quantity, 2);
    const new_cart = cart;
    new_cart.push({
      id_product: id,
      name: name,
      quantity: qty,
      price: price_x_quantity_rounded,
    });

    const oldTotalPrice = order.totalprice;
    const newTotalPrice =
      parseFloat(oldTotalPrice) + parseFloat(price_x_quantity);
    const roundedPriceTwoDecimals = preciseRound(newTotalPrice, 2);

    setOrder({
      cart: new_cart,
      totalprice: roundedPriceTwoDecimals,
    });

    event.target.qty.value = "";
  };

  const cartSubmit = async (event) => {
    event.preventDefault();
    event.persist();
    // Moves the user to the login page if he isn't logged in
    const loggedUserId = await getUserId();
    if (loggedUserId === undefined) {
      // Returns to login
      return (window.location.href = "/login");
    }

    const body = {
      id: loggedUserId,
      cart: cart,
    };

    axios({
      method: "post",
      url: "/order",
      data: body,
    })
      .then((res) => {
        setCart([]);
        setOrder({ cartSubmitSuccess: true });
        setNotifyNewOrder(!notifyNewOrder);
        setOrderList(!orderList);
        console.log(res);
      })
      .catch((err) => {
        setOrder({ cartSubmitSuccess: false });
        console.log(err);
      });
  };

  const getUserId = async () => {
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
  };

  return (
    <React.Fragment>
      <div className="container">
        <br />
        <h3>Cart</h3>
        <hr />
        <Cart
          totalprice={order.totalprice}
          cart={cart}
          cartSubmitSuccess={order.cartSubmitSuccess}
          stores={storeList}
          onSubmit={cartSubmit}
        />
        <br />
        <h3>Food</h3>
        <hr />
        <Food food={foodList} onSubmit={addToCart} />
      </div>
      {/* 
      <iframe width="425" height="350" frameborder="0"
        scrolling="no" marginheight="0" marginwidth="0"
        src="https://maps.google.com/maps?q=19.2853,-99.141301&hl=es&z=14&amp;output=embed">
      </iframe>
 */}

    </React.Fragment>
    
  );
}

function Food(props) {
  const foodList = props.food;
  const listFood = foodList.map((value, index) => {
    return (
      <div key={index} className="col-auto mb-4">
        <Card
          className="text-justify"
          style={{ width: "18rem", height: "100%" }}
        >
          <Card.Body>
            <Card.Title>{value.name.split(" ")[0]}</Card.Title>
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
      <>
        <label >Send Order TO </label>
        <select id="inputStore" name="inputStore" className="form-control" required>
          <DeliveryList stores={props.stores} />
        </select>
        <CartListItems
        totalprice={props.totalprice}
        cart={props.cart}
        key={0}
        onSubmit={props.onSubmit}
        />       
      </>
    );
  } else {
    return (
      <React.Fragment>
        <Alert variant="secondary">No items in your cart</Alert>
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

function DeliveryList(props) {
  const stores = props.stores;
  const listStores = stores.map((value, index) => {
    return (
      <option key={value.id_store} value={value.id_store}>
        {value.name} a ({`${Math.floor(value.distance*1000)}m`})
      </option>
    );
  });

  return <React.Fragment>{listStores}</React.Fragment>;
}



export default Order;
