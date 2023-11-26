import {
  getStatArrayFromObjects,
  getCurrentStatLimit,
} from "@/parsers/functions";
import { Character, Stat } from "@/types";

export function calculateConditionImmunities(character: Character) {
  const s = character.statistics!;

  const conditionImmunities = getStatArrayFromObjects<Stat[]>(
    character,
    "conditionImmunities"
  );
  s.conditionImmunities = [];

  const limit = getCurrentStatLimit(character);

  for (let i = 0; i < conditionImmunities.length; i++) {
    for (let j = 0; j < conditionImmunities[i].length; j++) {
      if (!limit || limit >= (conditionImmunities[i][j].availableAt || 0)) {
        const conditionImmunity = conditionImmunities[i][j].value;
        s.conditionImmunities.push({
          string: conditionImmunity,
          type: "conditionImmunity",
        });
      }
    }
  }
}
