const {
  getAllContactsService,
  getContactByIDService,
  addContactService,
  removeContactByIdService,
  updateContactByIdService,
} = require("../servises");
const { decorateConrtoller } = require("../utils");

const getAllContacts = decorateConrtoller(async (req, res) => {
  const result = await getAllContactsService(req.user._id, { ...req.query });
  res.json(result);
});

const getContactByID = decorateConrtoller(async (req, res) => {
  const result = await getContactByIDService(
    req.params.contactId,
    req.user._id
  );
  res.json(result);
});

const addContact = decorateConrtoller(async (req, res) => {
  const result = await addContactService(req.body, req.user._id);
  res.status(201).json(result);
});

const removeContactById = decorateConrtoller(async (req, res) => {
  await removeContactByIdService(req.params.contactId, req.user._id);
  res.json({ message: "Contact deleted" });
});

const updateContactById = decorateConrtoller(async (req, res) => {
  const result = await updateContactByIdService(
    req.params.contactId,
    req.user._id,
    req.body
  );
  res.json(result);
});

const updateStatusContact = updateContactById;

module.exports = {
  getAllContacts,
  getContactByID,
  addContact,
  removeContactById,
  updateContactById,
  updateStatusContact,
};
