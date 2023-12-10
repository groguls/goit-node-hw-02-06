const validateData = require("./validateData");
const decorateConrtoller = require("./decorateController");
const HttpError = require("./HttpError");
const handleNotFoundId = require("./handleNotFoundId");
const resizeAvatar = require("./resizeAvatar");
const sendMail = require("./sendMail");
const sendVerifyEmail = require("./sendVerifyEmail");

module.exports = {
  validateData,
  decorateConrtoller,
  HttpError,
  handleNotFoundId,
  resizeAvatar,
  sendMail,
  sendVerifyEmail,
};
