const User = require("../models/user");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const generateToken = require("./JWT");

exports.register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const user = await User.createUser({
      email: email,
      password: password,
      username: username,
    });
    res.status(201).json({ message: "user created", user });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  try {
    let user = await User.findUser({ email: email, password: password });
    let token = generateToken(user);

    res.status(200).json(token);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};
