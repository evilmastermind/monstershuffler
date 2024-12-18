import type { PostRandomNpcBody, GeneratorCharacter, PostRandomNpcBody } from "@/types";

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

export type NPCGeneratorSettings = {
  characters: GeneratorCharacter[];
  options: PostRandomNpcBody;
  isFormMode: boolean;
};


// export type TemporaryRenameManagement = {
//     oldPrename: string;
//     oldName: string;
//     oldSurname: string;
//     newPrename: string;
//     newName: string;
//     newSurname: string;
// };
