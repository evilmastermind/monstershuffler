
import type { Roll } from "@/types";

export type ResultByType = {
  result: number;
  type?: string;
};

export type DiceRoll = {
  roll: Roll;
  monster: string;
  d20Roll?: number;
  rollDetails: string;
  resultsByType: ResultByType[];
  totalResult: number;
  emojis: string[];
};
