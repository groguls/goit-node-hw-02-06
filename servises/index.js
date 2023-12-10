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
  updateAvatarUserService,
  verifyMailUserService,
  reSendMailUserService,
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
  updateAvatarUserService,
  verifyMailUserService,
  reSendMailUserService,
};
