const app = require("./app");

const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log(`Server running. Use our API on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
