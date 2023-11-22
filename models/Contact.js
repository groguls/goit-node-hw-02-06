const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { preUpdateHook, handleSaveError } = require("./hooks");

const nameRegExp =
  /^[a-zA-Zа-яА-ЯіІєЄїЇю.]+(([' -][a-zA-Zа-яА-ЯіІєЄїЇ .])?[a-zA-Zа-яА-ЯіІєЄїЇ.]*)*$/;
const phoneRegExp =
  /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/;
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      match: [
        nameRegExp,
        "Invalid name format. Name may contain only letters, apostrophe, dash and spaces.",
      ],
    },
    email: {
      type: String,
      match: [emailRegExp, "Invalid email format"],
      required: true,
    },
    phone: {
      type: String,
      reqiured: true,
      match: [
        phoneRegExp,
        "Invalid format. Phone number must be digits and can contain spaces, dashes, parentheses and can start with +",
      ],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveError);
contactSchema.pre("findOneAndUpdate", preUpdateHook);
contactSchema.post("findOneAndUpdate", handleSaveError);

const addRequestSchema = Joi.object({
  name: Joi.string().min(3).required().pattern(nameRegExp).messages({
    "any.required": "missing required {#label} field",
    "string.pattern.base":
      "Invalid name format. Name may contain only letters, apostrophe, dash and spaces.",
  }),
  email: Joi.string().required().pattern(emailRegExp).messages({
    "any.required": "missing required {#label} field",
    "string.email": "invalid email format",
  }),
  phone: Joi.string().required().pattern(phoneRegExp).messages({
    "any.required": "missing required {#label} field",
    "string.pattern.base":
      "Invalid format. Phone number must be digits and can contain spaces, dashes, parentheses and can start with +",
  }),
  favorite: Joi.boolean(),
}).and("name", "email", "phone");

const updateRequestSchema = Joi.object({
  name: addRequestSchema.extract("name").optional(),
  email: addRequestSchema.extract("email").optional(),
  phone: addRequestSchema.extract("phone").optional(),
  favorite: addRequestSchema.extract("favorite"),
}).or("name", "email", "phone");

const updateStatusRequestSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing field {#label}" }),
}).and("favorite");

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  addRequestSchema,
  updateRequestSchema,
  updateStatusRequestSchema,
};
