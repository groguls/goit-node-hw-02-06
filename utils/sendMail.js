const nodemailer = require("nodemailer");
require("dotenv").config();

const { GMAIL_ACCOUNT, GMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: GMAIL_ACCOUNT,
    pass: GMAIL_PASSWORD,
  },
});

async function sendMail(data) {
  return await transporter.sendMail({ from: GMAIL_ACCOUNT, ...data });
}

module.exports = sendMail;
