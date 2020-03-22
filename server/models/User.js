const knex = require("../database/connection");

exports.createUser = (username, type, password) => {
  const result = knex
    .from("users")
    .insert({ username: username, type: type, password: password });
  return result;
};

exports.findByUserusername = email => {
  const result = knex.from("users").where({ email: email });
  return result;
};

exports.findAll = () => {
  const result = knex.from("users").timeout(1000, { cancel: true });
  return result;
};
