import type { Character } from "@/types";
import { capitalizeFirst } from "@/utils";

export function calculateMeta(character: Character) {
  let meta = "";
  // Size Type
  const size = capitalizeFirst(character.statistics?.size?.string || "Medium");
  let type = capitalizeFirst(character.statistics?.type?.string || "Humanoid");
  if (character.statistics?.isSwarm) {
    if (type === "Monstrosity") {
      type = "Monstrosities";
    } else if (type !== "Fey") {
      type += "s";
    }
    meta += `${size} swarm of ${
      character.statistics!.sizeSingleEntityOfSwarm
    } ${type}`;
  } else {
    meta += `${size} ${type}`;
  }

  const pronouns = ["male", "female"].includes(
    character.statistics?.pronouns || ""
  )
    ? character.statistics?.pronouns
    : null;

  const subtypes = character.statistics?.subtypes;
  if (pronouns || subtypes?.length) {
    meta += " (";
    if (pronouns) {
      meta += pronouns;
      if (subtypes?.length) {
        meta += " ";
      }
    }
    if (subtypes?.length) {
      meta += subtypes.map((s) => s.string).join(", ");
    }
    meta += ")";
  }
  character.statistics!.meta = `${meta}, ${character.statistics?.alignment?.string}`;
}
