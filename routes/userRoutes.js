const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  changePassword,
  resetPassword,
} = require("../controllers/userController");

router.route("/").post(registerUser).put(changePassword);
router.route("/login").post(loginUser);
router.route("/reset").post(resetPassword);
module.exports = router;
