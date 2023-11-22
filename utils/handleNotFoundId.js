const HttpError = require("./HttpError");

const handleNotFoundId = (result, contactId) => {
  if (!result) {
    throw new HttpError(400, `ID ${contactId} not found`);
  }
};

module.exports = handleNotFoundId;
