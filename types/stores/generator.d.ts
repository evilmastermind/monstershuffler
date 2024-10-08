import type { PostRandomNpcBody } from "@/types";

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
  variantOfType: keyof PostRandomNpcBody;
};

export type Keyword = {
  word: string;
  type: keyof PostRandomNpcBody;
  value: number;
} & (VariantProps | {});

export type CharacterChanges = {
  CR?: number;
  alignmentMoral?: "Neutral" | "Any" | "Good" | "Evil";
  alignmentEthical?: "Lawful" | "Neutral" | "Chaotic" | "Any" | "Unaligned";
};
