// const usersDB = {
//   users: require("../models/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

// const bcrypt = require("bcrypt");

// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const fsPromises = require("fs").promises;
// const path = require("path");

// const handleLogin = async (req, res) => {
//   const { user, password } = req.body;
//   if (!user || !password)
//     return res
//       .status(400) //bad request
//       .json({ message: "User Name and password are required!" });

//   const foundUser = usersDB.users.find((u) => u.username === user);

//   console.log("found user", foundUser);
//   if (!foundUser) return res.sendStatus(401); //Unauthorized
//   //evaluate the password
//   const match = await bcrypt.compare(password, foundUser.password);
//   if (match) {
//     //create JWT
//     const accessToken = jwt.sign(
//       { username: foundUser.username },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: "60s" }
//     );
//     const refreshToken = jwt.sign(
//       { username: foundUser.username },
//       process.env.REFRESH_TOKEN_SECRET,
//       { expiresIn: "1h" }
//     );
//     //save the refresh token with the current user
//     const otherUsers = usersDB.users.filter(
//       (user) => user.username !== foundUser.username
//     );
//     const currentUser = { ...foundUser, refreshToken };
//     usersDB.setUsers([...otherUsers, currentUser]);

//     await fsPromises.writeFile(
//       path.join(__dirname, "..", "users.json"),
//       JSON.stringify(usersDB.users)
//     );
//     //reduce possible attacks from cross-site scripting
//     res.cookie("jwt", refreshToken, {
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000, //one day
//     });
//     res.json(accessToken);
//   } else {
//     res.sendStatus(401); //Unauthorized
//   }
// };

// module.exports = { handleLogin };
