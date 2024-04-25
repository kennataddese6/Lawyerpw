const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  changePassword,
  resetPassword,
  sendEmail,
} = require("../controllers/userController");

router.route("/").post(registerUser).put(protect, changePassword);
router.route("/login").post(loginUser);
router.route("/sendEmail").post(sendEmail);
router.route("/reset").post(protect, resetPassword);
module.exports = router;
