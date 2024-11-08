const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions")
const PORT = process.env.PORT || 3500;
const path = require("path");

//custom Middlewear
app.use((req, res, next) => {
  next();
});

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//middlewear for serving static files(built-in)
app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require('./routes/root'))
app.use("/register", require('./routes/register'))
app.use("/auth", require('./routes/auth'))
app.use("/employees", require('./routes/api/employees'))


// app.get("/*", (req, res) => {
//   //by default it gets the status 200(ok) because the file exits
//   //so you must chain the status as well
//   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// });

//Improved catch all routes handle errors
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({error: "Not Found!"})
  } else {
    res.type('txt').send("Not Found as Well!")
  }
});

//custom error
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Example app running on Port ${PORT}`);
});
