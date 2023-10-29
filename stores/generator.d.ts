import { components } from "@/types/backend";

export type getRaceWithVariantsListResponseSchema =
  components["schemas"]["raceSchemas"]["getRaceWithVariantsListResponseSchema"];

export type getClassWithVariantsListResponseSchema =
  components["schemas"]["classSchemas"]["getClassWithVariantsListResponseSchema"];

export type getBackgroundListResponseSchema =
  components["schemas"]["backgroundSchemas"]["getBackgroundListResponseSchema"];

export type Background = getBackgroundListResponseSchema["list"][number];

export type createRandomNpcInputSchema =
  components["schemas"]["npcSchemas"]["createRandomNpcInputSchema"];
export type createRandomNpcResponseSchema =
  components["schemas"]["npcSchemas"]["createRandomNpcResponseSchema"];
export type createFourRandomNpcsResponseSchema =
  components["schemas"]["npcSchemas"]["createFourRandomNpcsResponseSchema"];
export type getGeneratorDataResponseSchema =
  components["schemas"]["npcSchemas"]["getGeneratorDataResponseSchema"];

export type Character = createRandomNpcResponseSchema["npc"];

export type ObjectOrVariant = {
  id: number;
  name: string;
  userId: number;
  variantId?: number;
  variantName?: string;
  variantUserId?: number;
};

type VariantProps = {
  variantOf: number;
  variantOfType: keyof createRandomNpcInputSchema;
};

export type Keyword = {
  word: string;
  type: keyof createRandomNpcInputSchema;
  value: number;
} & (VariantProps | {});


export type CharacterChanges = {
  CR?: number;
  alignmentMoral?: "Neutral" | "Any" | "Good" | "Evil";
  alignmentEthical?: "Lawful" | "Neutral" | "Chaotic" | "Any" | "Unaligned";
  pronouns?: "male" | "female" | "neutral";
};
