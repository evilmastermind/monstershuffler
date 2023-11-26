import {
  getStatArrayFromObjects,
  getCurrentStatLimit,
} from "@/parsers/functions";
import { Character, Stat } from "@/types";

export function calculateDamageImmunities(character: Character) {
  const s = character.statistics!;

  const immunities = getStatArrayFromObjects<Stat[]>(character, "immunities");
  s.immunities = [];

  const limit = getCurrentStatLimit(character);

  for (let i = 0; i < immunities.length; i++) {
    for (let j = 0; j < immunities[i].length; j++) {
      if (!limit || limit >= (immunities[i][j].availableAt || 0)) {
        const immunity = immunities[i][j].value;
        s.immunities.push({
          string: immunity,
          type: "immunity",
        });
      }
    }
  }
}
