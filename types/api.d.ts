import { z } from "zod";
import {
  postFourRandomNpcsResponse,
  postRandomNpcResponse,
  postRandomNpcInput,
  getGeneratorDataResponse,
  objectList,
  objectWithVariantsList,
} from "monstershuffler-shared";

export type PostRandomNpcResponse = z.infer<typeof postRandomNpcResponse>;
export type PostRandomNpcInput = z.infer<typeof postRandomNpcInput>;
export type GetGeneratorDataResponse = z.infer<typeof getGeneratorDataResponse>;
export type PostFourRandomNpcsResponse = z.infer<
  typeof postFourRandomNpcsResponse
>;
export type ObjectList = z.infer<typeof objectList>;
export type ObjectWithVariantsList = z.infer<typeof objectWithVariantsList>;
