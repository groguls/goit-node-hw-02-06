const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("./contacts");

const { Contact, requestSchema } = require("./Contact");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  Contact,
  requestSchema,
};
