const user = require("../models/user");
let bc = require("bcryptjs");
let jwt = require("jsonwebtoken");
let config = require("config");
let secret = config.get("secret");
exports.signUp = async (req, res) => {
  let { firstName, email, password, number } = req.body;
  try {
    let existingUser = await user.findOne({ email });
    if (existingUser) {
      res.status(400).json({ msg: "this email is already used" });
    }
    let newUser = new user({
      firstName,
      email,
      password,
      number,
    });
    let salt = await bc.genSalt(10);
    let hash = await bc.hashSync((password, salt));
    newUser.password = hash;
    await newUser.save();
    let payload = {
      id: newUser._id,
      firstName: newUser.firstName,
    };
    let token = jwt.sign(payload, secret);
    res.send({
      token,
      newUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  let { email, password } = req.body;
  try {
    let theUser = await user.findOne({ email });
    if (!theUser) {
      res.status(400).json({ msg: "email or paswword are wrong" });
    }
    // let isMatch = await bc.compare(password, theUser.password);
    // if (!isMatch) {
    //   res.status(400).json({ msg: "email " });
    // }
    let payload = { id: theUser._id, email: theUser.email };
    let token = jwt.sign(payload, secret);
    res.send({
      token,
      theUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = (req, res) => {
  res.send(req.user);
};
