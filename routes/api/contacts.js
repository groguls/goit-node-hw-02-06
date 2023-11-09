const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await listContacts();
  res.send(result);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  res.send(result);
});

router.post("/", async (req, res, next) => {
  const newContact = req.body;
  const result = await addContact(newContact);
  res.send(result);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  res.send(result);
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  res.send(result);
});

module.exports = router;
