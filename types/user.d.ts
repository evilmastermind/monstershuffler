import { z } from "zod";
import {
  loginResponse,
  postUser,
  getUserResponse,
} from "monstershuffler-shared";

export type LoginResponse = z.infer<typeof loginResponse>;
export type PostUser = z.infer<typeof postUser>;
export type GetUserResponse = z.infer<typeof getUserResponse>;
