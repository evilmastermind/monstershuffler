import { calculateAlignment } from "@/utils/parsers/character/alignment";
import { calculateName } from "@/utils/parsers/character/name";
import { calculateLevel } from "@/utils/parsers/character/level";
import { Character } from "@/types/objects";
import { hasDefined, random } from "@/utils/functions";

export function createStats(character: Character) {
  createKeyIfUndefined(character, "statistics");
  createKeyIfUndefined(character, "variables");

  calculateAlignment(character);
  calculateName(character);
  calculateLevel(character);
}
