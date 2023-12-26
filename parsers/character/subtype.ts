import { getCurrentStatLimit, getStatArrayFromObjects } from "../functions";
import type { Character, Stat, DescriptionPart } from "@/types";

export function calculateSubtype(character: Character) {
  const subtypesArrays = getStatArrayFromObjects<Stat[]>(character, "subtypes");
  const subtypes: DescriptionPart[] = [];
  if (!subtypesArrays) {
    return;
  }

  const limit = getCurrentStatLimit(character);

  for (let i = 0; i < subtypesArrays.length; i++) {
    for (let j = 0; j < subtypesArrays[i].length; j++) {
      if (
        subtypesArrays[i][j].availableAt === undefined ||
        limit >= subtypesArrays[i][j].availableAt!
      ) {
        const subtype: DescriptionPart = {
          string: subtypesArrays[i][j].value,
          type: "subtype",
        };
        if (subtypesArrays[i][j].id) {
          subtype.id = subtypesArrays[i][j].id;
        }
        if (subtypesArrays[i][j].type) {
          subtype.type = subtypesArrays[i][j].type;
        }
        subtypes.push(subtype);
      }
    }
    if (!subtypes.length) {
      return;
    }
    character.statistics!.subtypes = subtypes;
  }
}
