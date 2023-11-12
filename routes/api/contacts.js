const express = require("express");

const {
  getAll,
  getByID,
  add,
  removeById,
  updateById,
} = require("../../controllers");
const isBodyEmpty = require("../../midlewares");
const { validateData } = require("../../decorators");
const schema = require("../../schemas");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getByID);

router.post("/", isBodyEmpty, validateData(schema), add);

router.delete("/:contactId", removeById);

router.put("/:contactId", isBodyEmpty, validateData(schema), updateById);

module.exports = router;
