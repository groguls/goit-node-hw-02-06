const express = require("express");

const {
  getAllContacts,
  getContactByID,
  addContact,
  removeContactById,
  updateContactById,
  updateStatusContact,
} = require("../../controllers");
const { validateData } = require("../../utils");
const {
  addRequestSchema,
  updateRequestSchema,
  updateStatusRequestSchema,
} = require("../../models");
const { isValidId, authVerification } = require("../../middlewares");

const contactsRouter = express.Router();

contactsRouter
  .route("/")
  .all(authVerification)
  .get(getAllContacts)
  .post(validateData(addRequestSchema), addContact);

contactsRouter
  .route("/:contactId")
  .all(authVerification, isValidId)
  .get(getContactByID)
  .delete(removeContactById)
  .put(validateData(updateRequestSchema), updateContactById);

contactsRouter.patch(
  "/:contactId/favorite",
  authVerification,
  isValidId,
  validateData(updateStatusRequestSchema),
  updateStatusContact
);

module.exports = contactsRouter;
