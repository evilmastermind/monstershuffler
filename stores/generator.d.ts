import type { PostRandomNpcInput } from "@/types";

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
  variantOfType: keyof PostRandomNpcInput;
};

export type Keyword = {
  word: string;
  type: keyof PostRandomNpcInput;
  value: number;
} & (VariantProps | {});

export type CharacterChanges = {
  CR?: number;
  alignmentMoral?: "Neutral" | "Any" | "Good" | "Evil";
  alignmentEthical?: "Lawful" | "Neutral" | "Chaotic" | "Any" | "Unaligned";
};
