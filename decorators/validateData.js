const HttpError = require("../helpers");

const validateData = (schema) => {
  const foo = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }
    next();
  };
  return foo;
};

module.exports = validateData;
