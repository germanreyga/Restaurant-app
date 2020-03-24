const knex = require("../database/connection");

exports.findAll = () => {
    const result = knex.from("stores").timeout(1000, { cancel: true });
    return result;
};

