const express = require("express");

const {
  getAll,
  getByID,
  add,
  removeById,
  updateById,
  updateStatusContact,
} = require("../../controllers");
const { validateData } = require("../../utils");
const {
  addRequestSchema,
  updateRequestSchema,
  updateStatusRequestSchema,
} = require("../../models");
const { isValidId } = require("../../middlewares");

const contactsRouter = express.Router();

contactsRouter.route("/").get(getAll).post(validateData(addRequestSchema), add);

contactsRouter
  .route("/:contactId")
  .all(isValidId)
  .get(getByID)
  .delete(removeById)
  .put(validateData(updateRequestSchema), updateById);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  validateData(updateStatusRequestSchema),
  updateStatusContact
);

module.exports = contactsRouter;
