import {
  getStatArrayFromObjects,
  getCurrentStatLimit,
} from "@/parsers/functions";
import { Character, Stat } from "@/types";

export function calculateDamageResistances(character: Character) {
  const s = character.statistics!;

  const resistances = getStatArrayFromObjects<Stat[]>(character, "resistances");
  s.resistances = [];

  const limit = getCurrentStatLimit(character);

  for (let i = 0; i < resistances.length; i++) {
    for (let j = 0; j < resistances[i].length; j++) {
      if (!limit || limit >= (resistances[i][j].availableAt || 0)) {
        const resistance = resistances[i][j].value;
        s.resistances.push({
          string: resistance,
          type: "resistance",
        });
      }
    }
  }
}
