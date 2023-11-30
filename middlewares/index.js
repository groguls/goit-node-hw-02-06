const globalErrorHandler = require("./globalErrorHandler");
const notFoundHandler = require("./notFoundHandler");
const isValidId = require("./IsValidId");
const authVerification = require("./authVerification");
const uploadAvatarMiddleware = require("./upload");

module.exports = {
  globalErrorHandler,
  notFoundHandler,
  isValidId,
  authVerification,
  uploadAvatarMiddleware,
};
