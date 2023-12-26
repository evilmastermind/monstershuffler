import {
  getStatArrayFromObjects,
  getCurrentStatLimit,
} from "@/parsers/functions";
import { Character, Stat } from "@/types";

export function calculateResistances(character: Character) {
  const s = character.statistics!;

  const stats = getStatArrayFromObjects<Stat[]>(character, "resistances");
  s.resistances = {
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
        s.resistances.array!.push({
          string,
          type: "damageType",
        });
      }
    }
  }

  if (!s.resistances.array!.length) {
    delete s.conditionImmunities;
    return;
  }
  s.resistances.string = s.resistances.array!.reduce(
    (acc, obj) => acc + obj.string,
    ""
  );
}
