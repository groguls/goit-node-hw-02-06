const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .pattern(
      /^[a-zA-Zа-яА-ЯіІєЄїЇю.]+(([' -][a-zA-Zа-яА-ЯіІєЄїЇ .])?[a-zA-Zа-яА-ЯіІєЄїЇ.]*)*$/
    )
    .messages({
      "any.required": "missing required {#label} field",
      "string.pattern.base":
        "Invalid name format. Name may contain only letters, apostrophe, dash and spaces.",
    }),
  email: Joi.string().required().email().messages({
    "any.required": "missing required {#label} field",
    "string.email": "invalid email format",
  }),
  phone: Joi.string()
    .required()
    .pattern(
      /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/
    )
    .messages({
      "any.required": "missing required {#label} field",
      "string.pattern.base":
        "Invalid format. Phone number must be digits and can contain spaces, dashes, parentheses and can start with +",
    }),
});

module.exports = schema;
