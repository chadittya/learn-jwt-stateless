import { afterEach, describe, expect, it } from "bun:test";
import { UserTest } from "./user-utils";
import app from "../src";

const baseUrl = "http://localhost:3000";

describe("POST /register", () => {
  afterEach(async () => {
    await UserTest.clean();
  });

  it("should can register new user", async () => {
    const response = await app.handle(
      new Request(`${baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "test",
          password: "12345678",
        }),
      })
    );

    expect(response.status).toBe(200);

    const body = await response.json();

    // console.log(response);
    // console.log(body);

    expect(body).toBeDefined();
    expect(body.id).toBeDefined();
    expect(body.username).toBe("test");
  });

  it("should be reject if username is blank", async () => {
    const response = await app.handle(
      new Request(`${baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "",
          password: "12345678",
        }),
      })
    );

    expect(response.status).toBe(422);

    const body = await response.json();

    // console.log(response);
    // console.log(body);

    expect(body.error).toBeDefined();
  });

  it("should be reject if password is blank", async () => {
    const response = await app.handle(
      new Request(`${baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "test",
          password: "",
        }),
      })
    );

    expect(response.status).toBe(422);

    const body = await response.json();

    // console.log(response);
    // console.log(body);

    expect(body.error).toBeDefined();
  });
});
