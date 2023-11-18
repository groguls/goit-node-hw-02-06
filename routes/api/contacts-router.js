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

const router = express.Router();

router.route("/").get(getAll).post(validateData(addRequestSchema), add);

router
  .route("/:contactId")
  .all(isValidId)
  .get(getByID)
  .delete(removeById)
  .put(validateData(updateRequestSchema), updateById);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateData(updateStatusRequestSchema),
  updateStatusContact
);

module.exports = router;
