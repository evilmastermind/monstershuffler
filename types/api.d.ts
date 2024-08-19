import { z } from "zod";
import {
  sGetSpellResponse,
  sPostFourRandomNpcsResponse,
  sPostRandomNpcResponse,
  sPostRandomNpcBody,
  sGetGeneratorDataResponse,
  objectList,
  objectWithVariantsList,
} from "monstershuffler-shared";

export type GetSpellResponse = z.infer<typeof sGetSpellResponse>;
export type PostRandomNpcResponse = z.infer<typeof sPostRandomNpcResponse>;
export type PostRandomNpcBody = z.infer<typeof sPostRandomNpcBody>;
export type GetGeneratorDataResponse = z.infer<typeof sGetGeneratorDataResponse>;
export type PostFourRandomNpcsResponse = z.infer<
  typeof sPostFourRandomNpcsResponse
>;
export type ObjectList = z.infer<typeof objectList>;
export type ObjectWithVariantsList = z.infer<typeof objectWithVariantsList>;
