let OrderModel = require("../models/Order");

exports.createOrder = (req, res) => {
  const cart = req.body.cart;
  totalprice = 0;
  cart.map((item, index) => {
    totalprice += parseFloat(item.price);
  });

  const order_hour = new Date();
  const status_payment = "unpaid";
  const status_order = "preparing";
  const order_total = preciseRound(totalprice, 2);
  const id_user = req.user.id_user; // Passport.js user session

  const data = {
    cart: cart,
    order_hour: order_hour,
    status_payment: status_payment,
    status_order: status_order,
    order_total: order_total,
    id_user: id_user
  };

  OrderModel.createOrder(data)
    .then(data => {
      res.json({ message: "Success" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err });
    });
};

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

function findOrder(id){
  OrderModel.find(id)
    .then((order) => {
      return order;
    })
    .catch(error => {
      res.status(500).json({ message: error});
    });
}

exports.showAllOrders = (req, res) => {
  OrderModel.all()
    .then(data => {
      res.json({ data: data });
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
};

exports.orderReady = (req, res) => {
  let id = req.body.id;
  let foundOrder = findOrder(id);
  OrderModel.markAsReady(foundOrder)
    .then((data) => {
      res.json({ data: data })
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
}

exports.orderDelivered = (req,res) => {
  let id = req.body.id;
  let foundOrder = findOrder(id);
  OrderModel.markAsDelivered(foundOrder)
    .then((data) => {
      res.json({ data: data })
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
}

// exports.productsFromOrder = (req, res) => {
//   let id = req.body.id;
//   let foundOrder = findOrder(id);
//   OrderModel.selectProductsFromOrder(foundOrder)
//     .then((data) => {
//       res.json({ data: data})
//     })
//     .catch(error => {
//       res.status(500).json({ message: error })
//     });
// }

exports.showUsersOrders = (req, res) => {
  let idUser = req.user.id_user;
  OrderModel.selectByClient(idUser)
    .then((data) => {
      res.json({ data: data })
    })
    .catch(error => {
      res.status(500).json({ message: error })
    });
}