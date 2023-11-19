import { Character } from "@/types";

export function calculateProficiency(character: Character) {
  const c = character.character;
  const method = c.proficiencyCalculation || "CR";
  if (method === "level") {
    character.statistics!.proficiency =
      1 + Math.ceil(character.statistics!.level / 4);
  } else {
    character.statistics!.proficiency =
      1 + Math.ceil(character.statistics!.CR.number / 4);
  }
  if (character.statistics!.proficiency < 2) {
    character.statistics!.proficiency = 2;
  }
  character.variables!.PROF = character.statistics!.proficiency;
}
