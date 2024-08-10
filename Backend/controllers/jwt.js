const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
const generateToken = (data) => {
  const secret = process.env.JWTSECRET;

  const token = jsonwebtoken.sign({ user_id: data.user_id }, secret);

  return token;
};


module.exports = generateToken;
