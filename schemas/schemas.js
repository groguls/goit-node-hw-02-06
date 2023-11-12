const Joi = require("joi");

const schemaAddContact = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .pattern(
      /^[a-zA-Zа-яА-ЯіІєЄїЇю.]+(([' -][a-zA-Zа-яА-ЯіІєЄїЇ .])?[a-zA-Zа-яА-ЯіІєЄїЇ.]*)*$/
    ),
  email: Joi.string().required().email(),
  phone: Joi.string()
    .required()

    .pattern(
      /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/
    ),
}).min(1);

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .min(3)
    .pattern(
      /^[a-zA-Zа-яА-ЯіІєЄїЇю.]+(([' -][a-zA-Zа-яА-ЯіІєЄїЇ .])?[a-zA-Zа-яА-ЯіІєЄїЇ.]*)*$/
    ),
  email: Joi.string().email(),
  phone: Joi.string().pattern(
    /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/
  ),
}).min(1);

module.exports = {
  schemaAddContact,
  schemaUpdateContact,
};
