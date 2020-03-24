const knex = require("../database/connection");

exports.allProducts = () => {
  const result = knex.from("products").timeout(1000);
  return result;
};
