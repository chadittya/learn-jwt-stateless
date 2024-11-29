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
}
