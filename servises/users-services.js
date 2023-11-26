const { User } = require("../models");
const { HttpError } = require("../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUserService = async (userData) => {
  const { password, email } = userData;
  const candidate = await User.findOne({ email });

  if (candidate) {
    throw new HttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return await User.create({ ...userData, password: hashedPassword });
};

const loginUserService = async (credentials) => {
  const { password, email } = credentials;

  const candidate = await User.findOne({ email });

  if (!candidate || !(await bcrypt.compare(password, candidate.password))) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const { PRIVATE_KEY } = process.env;

  const token = jwt.sign({ id: candidate._id }, PRIVATE_KEY, {
    expiresIn: "1h",
  });

  return await User.findByIdAndUpdate(candidate._id, { token });
};

const logoutUserService = async (id) => {
  return await User.findByIdAndUpdate(id, { token: null });
};

const subscriptionUserService = async (id, subscription) => {
  return await User.findByIdAndUpdate(id, subscription);
};

module.exports = {
  registerUserService,
  loginUserService,
  logoutUserService,
  subscriptionUserService,
};
