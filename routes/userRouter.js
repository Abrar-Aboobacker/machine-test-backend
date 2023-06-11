const express = require("express");
const router = express.Router();

const {
  userSignup,
  resendOtp,
  postOtp,
} = require("../controller/user-controller");

router.post("/signupPost", userSignup);
router.post("/resendOtp", resendOtp);
router.post("/postOtp", postOtp);
module.exports = router;
