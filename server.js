const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3500;
const path = require("path");

//custom Middlewear
app.use((req, res, next) => {
  next();
});
//Cross-origin Resource Sharing
const whiteList = [
  "https://www.googdle.com",
  "http://127.0.0.1:3500",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors--"));
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
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/test", express.static(path.join(__dirname, "/public")));

//app.use("/test", require('./routes/subdir'))

app.use("/", require('./routes/root'))
app.use("/test", require('./routes/subdir'))


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
