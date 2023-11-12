const express = require("express");

const {
  getAll,
  getByID,
  add,
  removeById,
  updateById,
} = require("../../controllers");

const { validateData } = require("../../decorators");
const { schemaAddContact, schemaUpdateContact } = require("../../schemas");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getByID);

router.post("/", validateData(schemaAddContact), add);

router.delete("/:contactId", removeById);

router.put("/:contactId", validateData(schemaUpdateContact), updateById);

module.exports = router;
