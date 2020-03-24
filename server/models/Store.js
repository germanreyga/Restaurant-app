const knex = require("../database/connection");

exports.findAll = () => {
  const result = knex
    .from("stores")
    .column("id_store", "name", "location")
    .timeout(1000, { cancel: true });
  return result;
};

exports.findAllEmployees = () => {
  const result = knex
    .from("users")
    .where("type", "employee")
    .orWhere("type", "admin")
    .timeout(1000, { cancel: true });
  return result;
};
