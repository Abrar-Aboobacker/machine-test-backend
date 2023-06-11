const express = require("express");
const router = express.Router();

const {
  userSignup,
  resendOtp,
  postOtp,
  userLogin,
  loginPost
} = require("../controller/user-controller");

router.post("/signupPost", userSignup);
router.post("/resendOtp", resendOtp);
router.post("/postOtp", postOtp);
router.post("/getLoginOtp",userLogin)
router.post("/loginpost",loginPost)
module.exports = router;
