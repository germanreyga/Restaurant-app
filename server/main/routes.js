var express = require("express");
var router = express.Router();
let authValidator = require("../validators/AuthValidator");
let passport = require("passport");
/* Controllers */
let authController = require("../controllers/AuthController");
let foodController = require("../controllers/FoodController");
let orderController = require("../controllers/OrderController");

router.post(
  "/registerUser",
  authValidator.registerUser,
  authController.registerUser
);

router.get("/userCredentials", authController.userCredentials);
router.post(
  "/loginUser",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/register"
  })
);

router.get("/logout", authController.logout);

router.get("/food", foodController.allFood);

router.post("/order", orderController.createOrder);

module.exports = router;
