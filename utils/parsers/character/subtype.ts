import { getPrioritizedStatistic, getStatArrayFromObjects } from "../functions";
import { typeToNumber } from "../stats";
import {
  type Character,
  type Subtypes,
  type StatNumberString,
} from "@/types/objects";

export function calculateSubtype(character: Character) {
  const subtypesArrays = getStatArrayFromObjects<Subtypes>(
    character,
    "subtypes"
  );
  const subtypes = <StatNumberString[]>[];
  if (!subtypesArrays) return;
  const subtypesArray: string[] = [];
  const CR = character.variations?.currentCR || 0;
  for (let i = 0; i < subtypesArrays.length; i++) {
    for (let j = 0; j < subtypesArrays[i].length; j++) {
      if (CR >= (subtypesArrays[i][j].availableAt || 0)) {
        character.statistics!.subtypes.push({
          id: subtypesArrays[i][j].id,
          value: subtypesArrays[i][j].value,
        });
      }
    }
    // character.tags!.type = type;
    // character.statistics!.type = {
    //   string: type,
    //   number: typeToNumber(type),
    // };
  }
}
