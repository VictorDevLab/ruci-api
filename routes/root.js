const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|index(.html)?", (req, res) => {
  //the express way
  //res.sendFile("./views/index.html", {root: __dirname})
  //the node way
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
