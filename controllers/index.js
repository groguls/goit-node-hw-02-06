const {
  getAll,
  getByID,
  add,
  removeById,
  updateById,
  updateStatusContact,
} = require("./controllers");
const { register, login } = require("./users-controllers");

module.exports = {
  getAll,
  getByID,
  add,
  removeById,
  updateById,
  updateStatusContact,
  register,
  login,
};
