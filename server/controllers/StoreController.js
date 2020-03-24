let StoreModel = require("../models/Store");

exports.getAllStores = (req, res) => {
    return StoreModel.findAll()
    .then(data  => {
        console.log(data);
        return data;
    })
    .catch(error => {
        res.status(500).json({ message: error });
    })
}
