let FoodModel = require("../models/Food");

exports.allFood = (req, res) => {
  FoodModel.allProducts()
    .then(data => {
      res.json({ data: data });
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
};
