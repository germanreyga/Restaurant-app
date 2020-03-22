var express = require("express");
var router = express.Router();
let authValidator = require("../validators/AuthValidator");
let passport = require("passport");
let authController = require("../controllers/AuthController");

router.post("/registerUser", authController.registerUser);

module.exports = router;
