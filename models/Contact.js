const { Schema, model } = require("mongoose");
const Joi = require("joi");

const nameRegExp =
  /^[a-zA-Zа-яА-ЯіІєЄїЇю.]+(([' -][a-zA-Zа-яА-ЯіІєЄїЇ .])?[a-zA-Zа-яА-ЯіІєЄїЇ.]*)*$/;
const phoneRegExp =
  /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/;

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
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

const requestSchema = Joi.object({
  name: Joi.string().min(3).required().pattern(nameRegExp).messages({
    "any.required": "missing required {#label} field",
    "string.pattern.base":
      "Invalid name format. Name may contain only letters, apostrophe, dash and spaces.",
  }),
  email: Joi.string().required().email().messages({
    "any.required": "missing required {#label} field",
    "string.email": "invalid email format",
  }),
  phone: Joi.string().required().pattern(phoneRegExp).messages({
    "any.required": "missing required {#label} field",
    "string.pattern.base":
      "Invalid format. Phone number must be digits and can contain spaces, dashes, parentheses and can start with +",
  }),
  favorite: Joi.boolean(),
});

module.exports = { Contact, requestSchema };
