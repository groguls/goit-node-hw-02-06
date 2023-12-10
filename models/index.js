const {
  Contact,
  addRequestSchema,
  updateRequestSchema,
  updateStatusRequestSchema,
} = require("./Contact");

const {
  User,
  registerUserSchema,
  loginUserSchema,
  subscriptionUserSchema,
  verificationUserSchema,
} = require("./User");

module.exports = {
  Contact,
  addRequestSchema,
  updateRequestSchema,
  updateStatusRequestSchema,
  User,
  registerUserSchema,
  loginUserSchema,
  subscriptionUserSchema,
  verificationUserSchema,
};
