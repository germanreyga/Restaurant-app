const { check } = require("express-validator");
const User = require("../models/User");

exports.registerUser = [
  // Revisa que el nombre no sea vacío
  check("inputUsername").notEmpty(),
  // Checks that username doesn't exists already in db
  check("inputUsername").custom(async (value, _) => {
    const userExists = await User.checkExistingUser(value);
    if (userExists === true) {
      throw new Error("Username already exists, pick another one");
    } else {
      return value;
    }
  }),
  // Revisa que el usuario sea basic o admin
  check("inputType").custom((value, _) => {
    if (value !== "client" && value !== "admin" && value !== "employee") {
      throw new Error("User role not valid");
    } else {
      return value;
    }
  }),
  // Revisa que el password este definido
  check("inputPassword").notEmpty(),
  // Revisa que el password sea el mismo
  check("inputConfirmPassword").custom((value, { req, loc, path }) => {
    if (value !== req.body.inputPassword) {
      throw new Error("Passwords don't match");
    } else {
      return value;
    }
  })
];

/*exports.basicUser = [
  // Confirms if the user has a session with basic permissions
  check().custom((value, { req, loc, path }) => {
    if (typeof req.user === "undefined") {
      throw new Error("Non-registered users are not allowed in the dashboard");
    } else {
      return value;
    }
  })
];

exports.adminUser = [
  // Confirms if the user has a session with admin permissions
  check().custom((value, { req, loc, path }) => {
    if (typeof req.user === "undefined") {
      throw new Error("Non-registered users are not allowed in the user list");
    } else if (req.user.role != "admin") {
      throw new Error(403);
    } else {
      return value;
    }
  })
];*/
