const usermodel = require('../models/usermodel');
const nodemailer = require('nodemailer');
const nodeUser = process.env.nodeMailer_User;
const nodePass = process.env.SMTP_key_value;
const port = process.env.SMTP_PORT;
const host = process.env.host;
let signupData;
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
            const { name, email } =
              req.body.values;
            const userExist = await usermodel.findOne({ email: email });
            if (!userExist) {
             
              signupData = {
                name,
                email,
              };
              const otpEmail = Math.floor(1000 + Math.random() * 9000);
              otp = otpEmail;
              sendEmailOTP(email,otpEmail)
              .then((info) => {
                console.log(`Message sent: ${info.messageId}`);
                console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
              })
              .catch((error) => {
                  console.log(error);
                // throw error;
              });
              res.status(200).send({message:'Otp is send to given email address',success:true,userExist})
             
            } else{
                  return res.status(200).send({message:"user already exists",success:false}); 
            }
          } catch (error) {
            console.log(error);
            res.status(500).send({ message: "error creating user", success: false });
          }
        }
}