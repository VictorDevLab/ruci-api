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
  const { user, password } = req.body;
  if (!user || !password)
    return res
      .status(400) //bad request
      .json({ message: "User Name and password are required!" });
  //check for duplicate usernames in the db
  const duplicate = usersDB.users.find((u) => u.username === user);
  if (duplicate) return res.sendStatus(409); //conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);
    //save the new user
    const newUser = { username: user, password: hashedPwd };
    usersDB.setUsers([...usersDB.users, newUser]);
    res.status(201).json({'success': `New user ${user} was successfully created`})
    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(usersDB.users)
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {handleNewUser}