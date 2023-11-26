const {
  getAllContactsService,
  getContactByIDService,
  addContactService,
  removeContactByIdService,
  updateContactByIdService,
} = require("./contacts-services");

const {
  registerUserService,
  loginUserService,
  logoutUserService,
  subscriptionUserService,
} = require("./users-services");

module.exports = {
  getAllContactsService,
  getContactByIDService,
  addContactService,
  removeContactByIdService,
  updateContactByIdService,
  registerUserService,
  loginUserService,
  logoutUserService,
  subscriptionUserService,
};
