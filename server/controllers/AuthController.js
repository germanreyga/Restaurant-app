const { validationResult } = require("express-validator");
let UserModel = require("../models/User");
const bcrypt = require("bcrypt");

exports.registerUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      status: 500,
      message: errors
    });
  }

  username = req.body.inputUsername;
  type = req.body.inputType;
  password = req.body.inputPassword;
  hashedPass = bcrypt.hashSync(password, 10);

  if(type === "client") {
    UserModel.createUser(username, type, hashedPass)
      .then(_ => {
        res.json({ message: "User created succesfully" });
      })
      .catch(error => {
        res.status(500).json({ message: error });
      });
  }
  else if(type ===  "admin") {
    UserModel.createUser(username, type, hashedPass)
      .then(_ => {
        res.json({ message: "User created succesfully" });
      })
      .catch(error => {
        res.status(500).json({ message: error });
      });
  }
  else if(type === "employee") {
    id_store =  1;
    //id_store =  req.body.inputId_store
      UserModel.createUserEmployee(username, type, hashedPass, id_store)
      .then(_ => {
        res.json({ message: "User created succesfully" });
      })
      .catch(error => {
        res.status(500).json({ message: error });
      });
  }
  else {
    return res.json({
      status: 500,
      message: "Something went wrong with the form's type"
    });
  }
  
};

exports.userCredentials = (req, res) => {
  if (req.user !== undefined) {
    return res.json({ user: req.user.username, type: req.user.type });
  } else {
    return res.status(500).json({ message: "No logged in user" });
  }
};

exports.logout = (req, res) => {
  req.logout();
  res.json({ message: "Logout successfull" });
};
