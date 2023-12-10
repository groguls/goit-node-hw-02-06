const sendMail = require("./sendMail");

const sendVerifyEmail = async (email, verificationToken) => {
  const { BASE_URL } = process.env;

  const verifyMail = {
    to: email,
    subject: "Email Verification",
    html: `<div>
      <p>Thank you for registering! Please verify your email address by clicking the link below:</p>
      <a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Verify Email</a>
      <p>If the link doesn't work, please copy and paste the following address into your browser:</p>
      <p>${BASE_URL}/users/verify/${verificationToken}</p>
      </div>`,
  };

  await sendMail(verifyMail);
};

module.exports = sendVerifyEmail;
