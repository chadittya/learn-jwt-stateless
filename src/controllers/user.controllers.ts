import Elysia from "elysia";
import { UserServices } from "../services/user.services";
import { UserSchema } from "../schema/user.schema";

export const User = new Elysia().post(
  "/register",
  ({ body }) => UserServices.register(body),
  UserSchema.register
);
