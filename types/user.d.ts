import { z } from "zod";
import {
  sLoginResponse,
  sPostUserBody,
  sGetUserResponse,
  sAnswer,
  sPostAnswerBody,
} from "monstershuffler-shared";

export type LoginResponse = z.infer<typeof sLoginResponse>;
export type PostUser = z.infer<typeof sPostUserBody>;
export type GetUserResponse = z.infer<typeof sGetUserResponse>;
export type Answer = z.infer<typeof sAnswer>;
export type PostAnswerBody = z.infer<typeof sPostAnswerBody>;
