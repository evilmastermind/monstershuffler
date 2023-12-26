import {
  getStatArrayFromObjects,
  getCurrentStatLimit,
} from "@/parsers/functions";
import { Character, Stat } from "@/types";

export function calculateImmunities(character: Character) {
  const s = character.statistics!;

  const stats = getStatArrayFromObjects<Stat[]>(character, "immunities");
  s.immunities = {
    string: "",
    array: [],
  };

  const limit = getCurrentStatLimit(character);

  for (let i = 0; i < stats.length; i++) {
    for (let j = 0; j < stats[i].length; j++) {
      if (
        stats[i][j].availableAt === undefined ||
        limit >= stats[i][j].availableAt!
      ) {
        const string = stats[i][j].value;
        s.immunities.array!.push({
          string,
          type: "damageType",
        });
      }
    }
  }

  if (!s.immunities.array!.length) {
    delete s.conditionImmunities;
    return;
  }
  s.immunities.string = s.immunities.array!.reduce(
    (acc, obj) => acc + obj.string,
    ""
  );
}
