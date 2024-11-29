import Elysia from "elysia";
import { UserServices } from "../services/user.services";
import { UserSchema } from "../schema/user.schema";
import jwt from "@elysiajs/jwt";
import { loginRequest } from "../models/user.model";

export const User = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRETS!,
    })
  )
  .post(
    "/register",
    ({ body, set }) => UserServices.register(body, set),
    UserSchema.register
  )
  .post("/login", async ({ body, jwt, set }) => {
    const user = await UserServices.login(body as loginRequest, set);

    const token = await jwt.sign({
      id: user.id,
      username: user.username,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    });

    return {
      token,
    };
  });
