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
const { requestSchema } = require("../../models");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getByID);

router.post("/", isBodyEmpty, validateData(requestSchema), add);

router.delete("/:contactId", removeById);

router.put("/:contactId", isBodyEmpty, validateData(requestSchema), updateById);

module.exports = router;
