const HttpError = require("./HttpError");

const handleNotFoundId = (result, contactId) => {
  if (!result) {
    throw new HttpError(404, `ID ${contactId} not found`);
  }
};

module.exports = handleNotFoundId;
