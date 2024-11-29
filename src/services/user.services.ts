import { prisma } from "../../prisma/client";
import {
  registerRequest,
  registerResponse,
  toRegisterResponse,
} from "../models/user.model";

export class UserServices {
  static async register(request: registerRequest): Promise<registerResponse> {
    const userExist = await prisma.user.findFirst({
      where: {
        username: request.username,
      },
    });

    if (userExist) {
      throw (
        (new Error(
          JSON.stringify({
            message: "User already exist",
          })
        ),
        { status: 400 })
      );
    }

    const user = await prisma.user.create({
      data: {
        username: request.username,
        password: await Bun.password.hash(request.password, {
          algorithm: "bcrypt",
          cost: 10,
        }),
      },
    });

    return toRegisterResponse(user);
  }
}
