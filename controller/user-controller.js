const usermodel = require("../models/usermodel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const nodeUser = process.env.nodeMailer_User;
const nodePass = process.env.SMTP_key_value;
const port = process.env.SMTP_PORT;
const host = process.env.host;
let signupData;
let otp = null;
const mailer = nodemailer.createTransport({
  host: host,
  port: port,
  auth: {
    user: nodeUser,
    pass: nodePass,
  },
});
let sendEmailOTP = (email, otpEmail) => {
  console.log(otpEmail);

  const mailOptions = {
    to: email,
    from: nodeUser,
    subject: "Otp for registration is: ",
    html:
      "<h3>OTP for email verification is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      otpEmail +
      "</h1>", // html body
  };
  return mailer.sendMail(mailOptions);
};
module.exports = {
  userSignup: async (req, res) => {
    try {
      const { name, email } = req.body.values;
      const userExist = await usermodel.findOne({ email: email });
      if (!userExist) {
        signupData = {
          name,
          email,
        };
        const otpEmail = Math.floor(1000 + Math.random() * 9000);
        otp = otpEmail;
        sendEmailOTP(email, otpEmail)
          .then((info) => {
            console.log(`Message sent: ${info.messageId}`);
            console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
          })
          .catch((error) => {
            console.log(error);
            // throw error;
          });
        res
          .status(200)
          .send({
            message: "Otp is send to given email address",
            success: true,
            userExist,
          });
      } else {
        return res
          .status(200)
          .send({ message: "user already exists", success: false });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "error creating user", success: false });
    }
  },
  resendOtp: async (req, res, next) => {
    try {
      const { userEmail } = req.body;
      const otpEmail = Math.floor(1000 + Math.random() * 9000);
      otp = otpEmail;
      sendEmailOTP(userEmail, otpEmail)
        .then((info) => {
          console.log(`Message sent: ${info.messageId}`);
          console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
        })
        .catch((error) => {
          throw error;
        });
      res
        .status(200)
        .send({
          message: "Otp is resend to given email address",
          success: true,
        });
    } catch (error) {
      res
        .status(500)
        .send({ message: "error while resending otp", success: false });
    }
  },
  postOtp: async (req, res, next) => {
    // let { name,email,phone,password,cpassword,about,}=signupData
    const { otpis } = req.body.values;
    try {
      if (otpis == otp) {
        let newUser = new usermodel({
          name: signupData.name,
          email: signupData.email,
        });
        await newUser.save();
        res.status(200).send({
          message: "user created successfully",
          success: true,
          newUser,
        });
      } else {
        res
          .status(500)
          .send({ message: "you entered wrong password", success: false });
      }
    } catch (error) {
      console.log(error);
      const errors = handleError(error);
      res.status(400).json({ errors, otpSend: false });
    }
  },
  userLogin: async (req, res) => {
    try {
      const { email } = req.body.values;
      const userExist = await usermodel.findOne({ email: email });
      if (userExist) {
        signupData = {
          email,
        };
        const otpEmail = Math.floor(1000 + Math.random() * 9000);
        otp = otpEmail;
        sendEmailOTP(email, otpEmail)
          .then((info) => {
            console.log(`Message sent: ${info.messageId}`);
            console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
          })
          .catch((error) => {
            console.log(error);
            // throw error;
          });
        res
          .status(200)
          .send({
            message: "Otp is send to given email address",
            success: true,
            userExist,
          });
      } else {
        return res
          .status(200)
          .send({ message: "user is not exists", success: false });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "error creating user", success: false });
    }
  },
  loginPost: async (req, res, next) => {
    const { otpis } = req.body.values;
    const user = await usermodel.findOne({email: signupData.email})
    try {
      if (otpis == otp) {
        
        
        const usertoken = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "2d" }
        );
        res.status(200).send({
          message: "Login successful",
          success: true,
          data: usertoken,
          user,
        });
      } else {
        res
          .status(500)
          .send({ message: "you entered wrong otp", success: false });
      }
    } catch (error) {
      console.log(error);
      const errors = handleError(error);
      res.status(400).json({ errors, otpSend: false });
    }
  },

};
