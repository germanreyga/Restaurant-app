const knex = require("../database/connection");

exports.PREPARING = 'preparing';
exports.READY = 'ready';
exports.DELIVERED = 'delivered';

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

exports.all = () =>{
  return knex
    .from('orders')
    .select('*');
}

exports.find = (id) => {
  return knex
    .select('*')
    .from('orders')
    .where('id_order',id)
    .first();
}

exports.markAsReady = (order) => {
  return knex('orders')
    .update({status: this.READY})
    .where('id_order', order.id);
}

exports.markAsDelivered = (order) => {
  return knex('orders')
    .update({status: this.DELIVERED})
    .where('id_order', order.id);
}

exports.selectByClient = (id) => {
  return knex
    .from('orders')
    .where('id_user', id);
}

exports.selectProductsFromOrder = (id) => {
  return knex('products')
    .join('order_product','order_product.id_product','=', 'products.id_product')
    .join('orders','order_product.id_order','=', id)
    .select('products.id_product','products.name','products.price');
}