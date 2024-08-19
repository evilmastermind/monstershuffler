import { z } from "zod";
import {
  sLoginResponse,
  sPostUserBody,
  sGetUserResponse,
} from "monstershuffler-shared";

export type LoginResponse = z.infer<typeof sLoginResponse>;
export type PostUser = z.infer<typeof sPostUserBody>;
export type GetUserResponse = z.infer<typeof sGetUserResponse>;
