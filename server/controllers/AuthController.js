const { validationResult } = require("express-validator");
let UserModel = require("../models/User");
const bcrypt = require("bcrypt");

exports.registerUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("errors", errors.array());
    return res.redirect("back");
  }

  username = req.body.inputUsername;
  type = req.body.inputType;
  password = req.body.inputPassword;
  hashedPass = bcrypt.hashSync(password, 10);

  UserModel.createUser(username, type, hashedPass)
    .then(data => {
      res.json({ message: "User created succesfully" });
    })
    .catch(error => {
      res.status(500).json({ message: "User created succesfully" });
    });
};
