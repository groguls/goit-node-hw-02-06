const express = require("express");
const { validateData } = require("../../utils");
const {
  registerUserSchema,
  loginUserSchema,
  subscriptionUserSchema,
} = require("../../models");
const {
  register,
  login,
  logout,
  current,
  subscription,
} = require("../../controllers");
const { authVerification } = require("../../middlewares");

const usersRouter = express.Router();

usersRouter.post("/register", validateData(registerUserSchema), register);
usersRouter.post("/login", validateData(loginUserSchema), login);
usersRouter.post("/logout", authVerification, logout);
usersRouter.get("/current", authVerification, current);
usersRouter.patch(
  "/",
  authVerification,
  validateData(subscriptionUserSchema),
  subscription
);

module.exports = usersRouter;
