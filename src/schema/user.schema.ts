import { t } from "elysia";

export class UserSchema {
  static register = {
    body: t.Object({
      username: t.String({
        minLength: 1,
        error: { error: "Username should not be blank" },
      }),
      password: t.String({
        minLength: 8,
        error: { error: "Password must be at least 8 character" },
      }),
    }),
  };
}
