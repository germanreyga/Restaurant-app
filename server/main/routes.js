var express = require("express");
var router = express.Router();
let authValidator = require("../validators/AuthValidator");
let passport = require("passport");
/* Controllers */
let authController = require("../controllers/AuthController");
let foodController = require("../controllers/FoodController");
let orderController = require("../controllers/OrderController");
let storeController = require("../controllers/StoreController");

/* Routes */
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

router.get("/order/all", orderController.showAllOrders); //show all orders

router.post("/order/ready", orderController.orderReady); //mark order as ready

router.post("/order/delivered", orderController.orderDelivered); //mark order as delivered

router.get("/order/products", orderController.productsFromOrder); //get products from certain order

router.get("/order/list", orderController.showUsersOrders); //show a user's orders

router.get("/stores/all", storeController.getAllStores);

router.get("/employees/all", storeController.getAllEmployees);

module.exports = router;