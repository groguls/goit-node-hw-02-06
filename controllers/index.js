const {
  getAllContacts,
  getContactByID,
  addContact,
  removeContactById,
  updateContactById,
  updateStatusContact,
} = require("./contacts-controllers");
const {
  register,
  login,
  logout,
  current,
  subscription,
  avatar,
} = require("./users-controllers");

module.exports = {
  getAllContacts,
  getContactByID,
  addContact,
  removeContactById,
  updateContactById,
  updateStatusContact,
  register,
  login,
  logout,
  current,
  subscription,
  avatar,
};
