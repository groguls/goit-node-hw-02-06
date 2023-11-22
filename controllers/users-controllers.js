const { User } = require("../models");
const { decorateConrtoller, handleNotFoundId, HttpError } = require("../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = decorateConrtoller(async (req, res) => {
  const { password, email } = req.body;

  const candidate = await User.findOne({ email });
  if (candidate) {
    throw new HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
});

const login = decorateConrtoller(async (req, res) => {
  const { password, email, _id } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const privateKey = "02VxmwDdcF76qAOnGd3uwetY3Ap0RQqF";

  const token = jwt.sign({ _id }, privateKey, { expiresIn: "1h" });

  res.json({
    token,
  });
});

module.exports = {
  register,
  login,
};
