import { User } from "@prisma/client";

export interface registerRequest {
  username: string;
  password: string;
}

export interface registerResponse {
  id: number;
  username: string;
}

export interface tokenResponse {
  token: string;
}

export function toRegisterResponse(user: User): registerResponse {
  return {
    id: user.id,
    username: user.username,
  };
}
