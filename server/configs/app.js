// configs/app.js
const dotenv = require("dotenv");

dotenv.config();

const appConfig = {
  env: process.env.APP_ENV || "development",
  expressPort: process.env.EXPRESS_PORT || 3306,
  secret: process.env.APP_SECRET || "YOU_SHOULD_NOT_USE_THIS_SECRET"
};

module.exports = appConfig;
