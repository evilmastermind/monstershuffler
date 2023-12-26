import {
  getStatArrayFromObjects,
  getCurrentStatLimit,
} from "@/parsers/functions";
import { Character, Stat } from "@/types";

export function calculateConditionImmunities(character: Character) {
  const s = character.statistics!;

  const stats = getStatArrayFromObjects<Stat[]>(
    character,
    "conditionImmunities"
  );
  s.conditionImmunities = {
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
        s.conditionImmunities.array!.push({
          string,
          type: "condition",
        });
      }
    }
  }

  if (!s.conditionImmunities.array!.length) {
    delete s.conditionImmunities;
    return;
  }
  s.conditionImmunities.string = s.conditionImmunities.array!.reduce(
    (acc, obj) => acc + obj.string,
    ""
  );
}
