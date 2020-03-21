var express = require("express");
var router = express.Router();

router.get("/hello", (req, res) => {
  res.json("hello world");
});

module.exports = router;
