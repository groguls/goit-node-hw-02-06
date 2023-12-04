const { User } = require("../models");
const { HttpError, resizeAvatar } = require("../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");

const registerUserService = async (userData) => {
  const { password, email } = userData;
  const candidate = await User.findOne({ email });

  if (candidate) {
    throw new HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email, { s: "250", d: "retro" }, true);
  const hashedPassword = await bcrypt.hash(password, 10);

  return await User.create({
    ...userData,
    password: hashedPassword,
    avatarURL,
  });
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

const updateAvatarUserService = async (id, avatar) => {
  if (!avatar) {
    throw new HttpError(400, "No file to update");
  }

  const { path: tempPath, filename } = avatar;

  await resizeAvatar(tempPath);

  const avatarPath = path.resolve("public", "avatars", filename);

  await fs.rename(tempPath, avatarPath);

  const avatarURL = path.join("avatars", filename);

  return await User.findByIdAndUpdate(id, { avatarURL });
};

module.exports = {
  registerUserService,
  loginUserService,
  logoutUserService,
  subscriptionUserService,
  updateAvatarUserService,
};
