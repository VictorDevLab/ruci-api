const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const path = require("path");

app.get("^/$|index(.html)?", (req, res) => {
  //the node way
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

//redirecting
app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});

app.listen(PORT, () => {
  console.log(`Example app running on Port ${PORT}`);
});
