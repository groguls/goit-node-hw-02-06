const express = require("express");
const { validateData } = require("../../utils");
const {
  registerUserSchema,
  loginUserSchema,
  subscriptionUserSchema,
  verificationUserSchema,
} = require("../../models");
const {
  register,
  login,
  logout,
  current,
  subscription,
  avatar,
  verifyMail,
  reSendVerificationMail,
} = require("../../controllers");
const {
  authVerification,
  uploadAvatarMiddleware,
} = require("../../middlewares");

const usersRouter = express.Router();

usersRouter.post("/register", validateData(registerUserSchema), register);
usersRouter.post("/login", validateData(loginUserSchema), login);
usersRouter.post(
  "/verify",
  validateData(verificationUserSchema),
  reSendVerificationMail
);
usersRouter.post("/logout", authVerification, logout);
usersRouter.get("/current", authVerification, current);
usersRouter.get("/verify/:verificationToken", verifyMail);
usersRouter.patch(
  "/",
  authVerification,
  validateData(subscriptionUserSchema),
  subscription
);
usersRouter.patch("/avatars", authVerification, uploadAvatarMiddleware, avatar);

module.exports = usersRouter;
