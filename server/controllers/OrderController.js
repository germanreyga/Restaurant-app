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
  const id_user = req.body.id;

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
