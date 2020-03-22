let appConfig = require("../configs/app");
const knexfile = require("../knexfile");
const knex = require("knex")(knexfile[appConfig.env]);
module.exports = knex;
