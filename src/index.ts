import { Elysia } from "elysia";
import { User } from "./controllers/user.controllers";

const app = new Elysia().use(User).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export default app;
