const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
    // expiresIn: 1,
    // expiresIn: "10s",
  });

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, roles } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password.toString(), salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    roles,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Incorrect Email or Password");
  }
});
const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.body.Id });
  if (user) {
    const passwordMatch = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );
    if (passwordMatch) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        req.body.newPassword,
        saltRounds
      );
      user.password = hashedPassword;
      await user.save();
      res.status(200).json("Password Changed Successfully.");
    } else {
      res.status(401).json("Incorrect Password");
    }
  } else {
    res.status(404).json("User not found");
  }
});
const resetPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      process.env.RESET_PASSWORD,
      saltRounds
    );
    user.password = hashedPassword;
    await user.save();
    res.status(200).json("Password resetted Successfully.");
  } else {
    res.status(404).json("User not found");
  }
});
module.exports = {
  loginUser,
  registerUser,
  changePassword,
  resetPassword,
};
