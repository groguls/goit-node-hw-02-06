const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");

require("dotenv").config();

let server = null;

beforeAll(async () => {
  await mongoose.connect(process.env.URI);
  server = app.listen(process.env.PORT + 1);
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe("Test /users/login route", () => {
  test("should login with correct credentials and return a token and user info", async () => {
    const credentials = {
      email: "test@user.com",
      password: "123456",
    };

    const { body } = await request(app)
      .post("/users/login")
      .send(credentials)
      .expect(200);

    expect(body).toHaveProperty("token");
    expect(body.token).not.toBeNull();
    expect(body).toHaveProperty("user");
    expect(body.user).toHaveProperty("email");
    expect(body.user).toHaveProperty("subscription");
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");
  });

  test("should return an error for invalid credentials", async () => {
    const invalidCredentials = {
      email: "invalid@user.com",
      password: "invalidPassword",
    };

    const { body } = await request(app)
      .post("/users/login")
      .send(invalidCredentials)
      .expect(401);

    expect(body).toHaveProperty("message", "Email or password is wrong");
  });

  test("should return a validation error ", async () => {
    const invalidCredentials = {
      email: "invalidMail.com",
      noPassword: "none",
    };

    const { body } = await request(app)
      .post("/users/login")
      .send(invalidCredentials)
      .expect(400);

    expect(body).toHaveProperty("message");
  });
});
