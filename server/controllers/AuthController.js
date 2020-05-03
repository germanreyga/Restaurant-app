const { validationResult } = require("express-validator");
let UserModel = require("../models/User");
const bcrypt = require("bcrypt");

exports.registerUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      status: 500,
      message: errors,
    });
  }

  let username = req.body.inputUsername;
  let type = req.body.inputType;
  let password = req.body.inputPassword;
  let hashedPass = bcrypt.hashSync(password, 10);
  let id_store;

  // Nulls the id_store if the user is a client type, since it's not related to a specific store
  if (type === "client" || req.body.inputStore === undefined) {
    id_store = undefined;
  } else {
    id_store = req.body.inputStore;
  }

  UserModel.createUser(username, type, hashedPass, id_store)
    .then((_) => {
      res.json({ message: "User created succesfully" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: error });
    });
};

exports.userCredentials = (req, res) => {
  if (req.user !== undefined) {
    return res.json({
      user: req.user.username,
      type: req.user.type,
      id: req.user.id_user,
    });
  } else {
    return res.status(500).json({ message: "No logged in user" });
  }
};

exports.logout = (req, res) => {
  req.logout();
  res.json({ message: "Logout successfull" });
};
