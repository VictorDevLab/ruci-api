const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401); //Unauthorized.
  console.log(authHeader); //Bearer token
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) res.sendStatus(403); //forbidden. The token doesn't match with our secret access token
    req.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;
