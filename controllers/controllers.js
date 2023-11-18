const { Contact } = require("../models");
const { decorateConrtoller, handleNotFoundId } = require("../utils");

const getAll = decorateConrtoller(async (req, res) => {
  const result = await Contact.find();
  res.json(result);
});

const getByID = decorateConrtoller(async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  handleNotFoundId(result, contactId);
  res.json(result);
});

const add = decorateConrtoller(async (req, res) => {
  const newContact = req.body;
  const result = await Contact.create(newContact);
  res.status(201).json(result);
});

const removeById = decorateConrtoller(async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  handleNotFoundId(result, contactId);
  res.json({ message: "Contact deleted" });
});

const updateById = decorateConrtoller(async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  handleNotFoundId(result, contactId);
  res.json(result);
});

const updateStatusContact = updateById;

module.exports = {
  getAll,
  getByID,
  add,
  removeById,
  updateById,
  updateStatusContact,
};
