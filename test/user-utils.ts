import { prisma } from "../prisma/client";

export class UserTest {
  static async clean() {
    const clean = await prisma.user.deleteMany({
      where: {
        username: "test",
      },
    });

    return clean;
  }

  static async create() {
    const user = await prisma.user.create({
      data: {
        username: "test",
        password: await Bun.password.hash("12345678", {
          algorithm: "bcrypt",
          cost: 10,
        }),
      },
    });

    return user;
  }
}
