var express = require("express");
var router = express.Router();
let authValidator = require("../validators/AuthValidator");
let passport = require("passport");
let authController = require("../controllers/AuthController");

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

module.exports = router;
