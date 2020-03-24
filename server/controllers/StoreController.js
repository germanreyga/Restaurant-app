let StoreModel = require("../models/Store");

exports.getAllStores = (req, res) => {
  return StoreModel.findAll()
    .then(data => {
      res.json({ data: data });
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
};
exports.getAllEmployees = (req, res) => {
  return StoreModel.findAllEmployees()
    .then(data => {
      res.json({ data: data });
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
};
