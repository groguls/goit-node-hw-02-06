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
      "string.pattern.base": "invalid name format",
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
      "string.pattern.base": "invalid phone format",
    }),
});

module.exports = schema;
