const knex = require("../database/connection");

exports.createUser = (username, type, password) => {
  const result = knex
    .from("users")
    .insert({ username: username, type: type, password: password });
  return result;
};

exports.findByUsername = username => {
  const result = knex.from("users").where({ username: username });
  return result;
};

exports.findAll = () => {
  const result = knex.from("users").timeout(1000, { cancel: true });
  return result;
};
