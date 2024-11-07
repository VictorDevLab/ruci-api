const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password)
    return res
      .status(400) //bad request
      .json({ message: "User Name and password are required!" });
  //check for duplicate usernames in the db
  const duplicate = usersDB.users.find((user) => user.name === name);
  if (duplicate) return res.sendStatus(409); //conflict

  try {
    //save the person in the db
  } catch (err) {
    return;
  }
};
