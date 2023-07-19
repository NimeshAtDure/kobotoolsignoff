const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");

const generateOTP = () => {
  return crypto.randomBytes(3).toString("hex");
};

const sendOTP = (email, OTP) => {
  //   const transporter = nodemailer.createTransport({
  //     host: 'smtp.gmail.com',
  //     port: 465,
  //     secure: true, // use SSL
  //     auth: {
  //         user: 'contact.rbmgateway.org@gmail.com',
  //         pass: 'ogglxjgqrgbcjdmo'
  //     }
  // });

  //   const mailOptions = {
  //     from: 'contact.rbmgateway.org@gmail.com',
  //     to: email,
  //     subject: "RBM Gateway - OTP for User Login",
  //     //text: `Your OTP is: ${OTP}`,
  //     html: `<p>Please use the following One Time Password (OTP) for authentication:</p>
  //             <p><b><strong>${OTP}</strong></b></p>
  //             <p>Don't share the OTP with anyone.</p>`
  //   };

  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log("Email sent: " + info.response);
  //     }
  //   });

  const msg = {
    to: email,
    from: "contact@rbmgateway.org", // Use the email address or domain you verified above
    subject: "RBM Gateway - OTP for User Login",
    text: '',
    html: `<p>Please use the following One Time Password (OTP) for authentication:</p>
            <p><b><strong>${OTP}</strong></b></p>
            <p>Don't share the OTP with anyone.</p>`,
  };

  sgMail
  .send(msg)
  .then(() => {}, error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  });

};

module.exports = { generateOTP, sendOTP };
