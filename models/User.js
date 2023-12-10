const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { preUpdateHook, handleSaveError } = require("./hooks");

const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minLength: [6, "Password must be at least 6 characters long"],
    },
    email: {
      type: String,
      match: [emailRegExp, "Invalid email format"],
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: { type: String, default: null },
    avatarURL: { type: String, required: true },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
      default: null,
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", preUpdateHook);
userSchema.post("findOneAndUpdate", handleSaveError);

const registerUserSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "any.required": "missing required {#label} field",
    "string.min": "Password must be at least 6 characters long",
  }),
  email: Joi.string().required().pattern(emailRegExp).messages({
    "any.required": "missing required {#label} field",
    "string.pattern": "invalid email format",
  }),
  subscription: Joi.string()
    .valid(...subscriptionList)
    .messages({
      "any.valid": "allowed only {$subscriptionList} values",
    }),
}).and("password", "email");

const loginUserSchema = Joi.object({
  email: registerUserSchema.extract("email"),
  password: registerUserSchema.extract("password"),
}).and("email", "password");

const subscriptionUserSchema = Joi.object({
  subscription: registerUserSchema.extract("subscription"),
}).and("subscription");

const verificationUserSchema = Joi.object({
  email: registerUserSchema.extract("email"),
}).and("email");

const User = model("user", userSchema);

module.exports = {
  User,
  registerUserSchema,
  loginUserSchema,
  subscriptionUserSchema,
  verificationUserSchema,
};
