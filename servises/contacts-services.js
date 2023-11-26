const { Contact } = require("../models");
const { handleNotFoundId } = require("../utils");

const getAllContactsService = async (filter, { ...params }) => {
  const { page, limit, ...filters } = params;
  const totalRecords = await Contact.find({
    owner: filter,
    ...filters,
  }).countDocuments();
  const contacts = await Contact.find({ owner: filter, ...filters })
    .skip(page > 0 ? (page - 1) * limit : 0)
    .limit(limit);
  return {
    contacts,
    page,
    totalRecords,
  };
};

const getContactByIDService = async (_id, owner) => {
  const result = await Contact.findOne({ _id, owner });
  handleNotFoundId(result, _id);
  return result;
};

const addContactService = async (newContact, owner) => {
  return await Contact.create({ ...newContact, owner });
};

const removeContactByIdService = async (_id, owner) => {
  const result = await Contact.findOneAndDelete({ _id, owner });
  handleNotFoundId(result, _id);
  return result;
};

const updateContactByIdService = async (_id, owner, update) => {
  const result = await Contact.findOneAndUpdate({ _id, owner }, update);
  handleNotFoundId(result, _id);
  return result;
};

module.exports = {
  getAllContactsService,
  getContactByIDService,
  addContactService,
  removeContactByIdService,
  updateContactByIdService,
};
