import { User } from "@prisma/client";
import { prisma } from "../../prisma/client";
import {
  registerRequest,
  registerResponse,
  toRegisterResponse,
} from "../models/user.model";

export class UserServices {
  static async getUsername(username: string) {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    return user;
  }

  static async register(
    request: registerRequest,
    set: any
  ): Promise<registerResponse> {
    const userExist = await this.getUsername(request.username);

    if (userExist) {
      set.status = 400;
      throw new Error(
        JSON.stringify({
          message: "User already exist",
        })
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

  static async login(request: registerRequest, set: any) {
    const userExist = await this.getUsername(request.username);

    if (!userExist) {
      set.status = 400;
      throw new Error(
        JSON.stringify({
          message: "User or Password is invalid",
        })
      );
    }

    const PassValid = await Bun.password.verify(
      request.password,
      userExist.password,
      "bcrypt"
    );

    if (!PassValid) {
      set.status = 400;
      throw new Error(
        JSON.stringify({
          message: "User or Password is invalid",
        })
      );
    }

    return toRegisterResponse(userExist);
  }
}
