const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts-router");
const usersRouter = require("./routes/api/users-router");
const { notFoundHandler, globalErrorHandler } = require("./middlewares");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/users", usersRouter);

app.use(notFoundHandler);
app.use(globalErrorHandler);

module.exports = app;
