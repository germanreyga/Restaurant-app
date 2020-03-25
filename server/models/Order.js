const knex = require("../database/connection");

exports.PREPARING = "preparing";
exports.READY = "ready";
exports.DELIVERED = "delivered";

exports.createOrder = async data => {
  const cart = data.cart;
  const order_hour = data.order_hour;
  const status_payment = data.status_payment;
  const status_order = data.status_order;
  const order_total = data.order_total;
  const id_user = data.id_user;

  try {
    return await knex.transaction(async trx => {
      const insertid = await knex("orders")
        .insert({
          order_hour: order_hour,
          status_payment: status_payment,
          status_order: status_order,
          order_total: order_total,
          id_user: id_user
        })
        .transacting(trx);

      const singleinsertid = insertid[0];
      let products = [];
      let index = 0;
      cart.forEach(cartitem => {
        products.push({
          id_order: singleinsertid,
          id_product: cartitem.id_product,
          quantity: cartitem.quantity
        });
        index++;
      });

      await knex("order_product")
        .insert(products)
        .transacting(trx);
    });
  } catch (error) {
    console.log("ERROR");
    console.error(error);
  }
};

exports.all = () => {
  return knex.from("orders").select("*");
};

exports.find = id => {
  return knex
    .select("*")
    .from("orders")
    .where("id_order", id)
    .first();
};

exports.markAsReady = id => {
  return knex("orders")
    .update({ status_order: this.READY })
    .where("id_order", id);
};

exports.markAsDelivered = id => {
  console.log("ENTRA");
  return knex("orders")
    .update({ status_order: this.DELIVERED })
    .where("id_order", id);
};

exports.selectByClient = id => {
  return knex.from("orders").where("id_user", id);
};

exports.selectProductsFromOrder = id => {
  return knex("products")
    .join(
      "order_product",
      "order_product.id_product",
      "=",
      "products.id_product"
    )
    .join("orders", "order_product.id_order", "=", "orders.id_order")
    .join("users", "orders.id_user", "=", "users.id_user")
    .where("orders.id_order", id)
    .select(
      "products.id_product",
      "products.name",
      "products.price",
      "order_product.id_order",
      "order_product.quantity",
      "orders.order_total",
      "users.id_user",
      "users.username"
    );
};

exports.selectPreparingOrders = id => {
  return knex("orders")
    .where("status_order", this.PREPARING)
    .column("id_order");
};

exports.readyOrDelivered = () => {
  return knex("orders").whereIn("status_order", [this.READY, this.DELIVERED]);
};
