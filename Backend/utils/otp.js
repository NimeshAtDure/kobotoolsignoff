const crypto = require("crypto");
const nodemailer = require("nodemailer");

const generateOTP = () => {
  return crypto.randomBytes(3).toString("hex");
};

const sendOTP = (email, OTP) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'contact.rbmgateway.org@gmail.com',
        pass: 'ogglxjgqrgbcjdmo'
    }
});

  const mailOptions = {
    from: 'contact.rbmgateway.org@gmail.com',
    to: email,
    subject: "RBM Gateway - OTP for User Login",
    //text: `Your OTP is: ${OTP}`,
    html: `<p>Please use the following One Time Password (OTP) for authentication:</p>
            <p><b><strong>${OTP}</strong></b></p>
            <p>Don't share the OTP with anyone.</p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { generateOTP, sendOTP };
