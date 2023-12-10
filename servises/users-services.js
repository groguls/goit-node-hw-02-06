const { User } = require("../models");
const { HttpError, resizeAvatar, sendVerifyEmail } = require("../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const registerUserService = async (userData) => {
  const { password, email } = userData;
  const candidate = await User.findOne({ email });

  if (candidate) {
    throw new HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email, { s: "250", d: "retro" }, true);
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  await sendVerifyEmail(email, verificationToken);

  return await User.create({
    ...userData,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });
};

const loginUserService = async (credentials) => {
  const { password, email } = credentials;

  const candidate = await User.findOne({ email });

  if (!candidate || !(await bcrypt.compare(password, candidate.password))) {
    throw new HttpError(401, "Email or password is wrong");
  }

  if (!candidate.verify) {
    throw new HttpError(400, "Email verification is required before log in");
  }

  const token = jwt.sign({ id: candidate._id }, process.env.PRIVATE_KEY, {
    expiresIn: "1h",
  });

  candidate.token = token;
  return await candidate.save({ validateBeforeSave: false });
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

const verifyMailUserService = async (verificationToken) => {
  const candidate = await User.findOne({ verificationToken });

  if (!candidate) {
    throw new HttpError(404, "User not found");
  }

  candidate.verificationToken = null;
  candidate.verify = true;
  return await candidate.save({ validateBeforeSave: false });
};

const reSendMailUserService = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(404, "Email not found");
  }

  if (user.verify) {
    throw new HttpError(400, "Verification has already been passed");
  }

  return await sendVerifyEmail(user.email, user.verificationToken);
};

module.exports = {
  registerUserService,
  loginUserService,
  logoutUserService,
  subscriptionUserService,
  updateAvatarUserService,
  verifyMailUserService,
  reSendMailUserService,
};
