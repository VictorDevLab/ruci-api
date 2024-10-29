const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3500;
const path = require("path");

//custom Middlewear
app.use((req, res, next) => {
  //just a logger
  console.log(`${req.path}- ${req.method}`);
});
//Cross-origin Resource Sharing
const whiteList = [
  "https://www.google.com",
  "http://127.0.0.1:3000",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
//for handling form data(built-in)
app.use(express.urlencoded({ extended: false }));

//built in middlewear for json(built-in)
app.use(express.json());
//middlewear for serving static files(built-in)
app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|index(.html)?", (req, res) => {
  //the express way
  //res.sendFile("./views/index.html", {root: __dirname})
  //the node way
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});
//redirecting
app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});
//route handlers
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("Hello was requested");
    //basically just calls the next function
    next();
  },
  (req, res) => {
    res.send("You requested for hello and this is what you are getting");
  }
);

//chaining Route Handlers

const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res, next) => {
  console.log("three");
  res.send("Requested as many hehe");
};

app.get("/asmany(.html)?", [one, two, three]);

app.get("/*", (req, res) => {
  //by default it gets the status 200(ok) because the file exits
  //so you must chain the status as well
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Example app running on Port ${PORT}`);
});
