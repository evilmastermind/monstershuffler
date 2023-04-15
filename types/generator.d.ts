import { components } from "@/types/backend";

export type getRaceWithVariantsListResponseSchema =
  components["schemas"]["raceSchemas"]["getRaceWithVariantsListResponseSchema"];

export type getClassWithVariantsListResponseSchema =
  components["schemas"]["classSchemas"]["getClassWithVariantsListResponseSchema"];

  export type getProfessionListResponseSchema =
  components["schemas"]["professionSchemas"]["getProfessionListResponseSchema"];

export type Profession = getProfessionListResponseSchema["list"][number];

export type ObjectOrVariant = {
  id: number;
  name: string;
  userId: number;
  variantId?: number;
  variantName?: string;
  variantUserId?: number;
};
