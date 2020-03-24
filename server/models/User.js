const knex = require("../database/connection");

exports.createUser = async (username, type, password, id_store) => {
  const result = knex.from("users").insert({
    username: username,
    type: type,
    password: password,
    id_store: id_store
  });
  return result;
};

exports.createUserEmployee = (username, type, password, id_store) => {
  const result = knex.from("users").insert({
    username: username,
    type: type,
    password: password,
    id_store: id_store
  });
  return result;
};

exports.findByUsername = username => {
  const result = knex.from("users").where({ username: username });
  return result;
};

exports.checkExistingUser = async username => {
  const rows = await knex.from("users").where({ username: username });
  if (rows.length > 0) {
    return true;
  } else {
    return false;
  }
};

exports.findAll = () => {
  const result = knex.from("users").timeout(1000, { cancel: true });
  return result;
};
