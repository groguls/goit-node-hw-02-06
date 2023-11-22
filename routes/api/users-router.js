const express = require("express");
const { validateData } = require("../../utils");
const { registerUserSchema, loginUserSchema } = require("../../models");
const { register, login } = require("../../controllers");

const usersRouter = express.Router();

usersRouter.post("/register", validateData(registerUserSchema), register);
usersRouter.post("/login", validateData(loginUserSchema), login);

module.exports = usersRouter;
