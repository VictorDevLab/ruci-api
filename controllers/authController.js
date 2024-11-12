const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res
      .status(400) //bad request
      .json({ message: "User Name and password are required!" });

  const foundUser = usersDB.users.find((u) => u.username === user);

  console.log("found user", foundUser);
  if (!foundUser) return res.sendStatus(401); //Unauthorized

  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    //create JWT
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ success: `User ${user} is logged in` });
  } else {
    res.sendStatus(401); //Unauthorized
  }
};

module.exports = { handleLogin };
