import { createPart } from "../functions";
import type { Character, StatStringArray } from "@/types";
import { capitalizeFirst } from "@/utils";

export function calculateMeta(character: Character) {
  character.statistics!.meta = {
    string: "",
    array: [],
  };

  const meta = character.statistics!.meta as StatStringArray;

  // Size Type
  const size = capitalizeFirst(character.statistics?.size?.string || "Medium");
  let type = capitalizeFirst(character.statistics?.type?.string || "Humanoid");
  if (character.statistics?.isSwarm) {
    if (type === "Monstrosity") {
      type = "Monstrosities";
    } else if (type !== "Fey") {
      type += "s";
    }
    meta.array!.push(createPart(size, "size"));
    meta.array!.push(createPart(" "));
    meta.array!.push(createPart("swarm of", "translatableText"));
    meta.array!.push(createPart(" "));
    meta.array!.push(
      createPart(character.statistics!.sizeSingleEntityOfSwarm!.string, "size")
    );
    meta.array!.push(createPart(" "));
    meta.array!.push(createPart(type, "type"));
  } else {
    meta.array!.push(createPart(size, "size"));
    meta.array!.push(createPart(" "));
    meta.array!.push(createPart(type, "type"));
  }

  const pronouns = ["male", "female"].includes(
    character.statistics?.pronouns || ""
  )
    ? character.statistics?.pronouns
    : null;

  const subtypes = character.statistics?.subtypes || [];

  if (pronouns || subtypes.length) {
    meta.array!.push(createPart(" ("));
    if (pronouns && ["male", "female"].includes(pronouns)) {
      meta.array!.push(createPart(pronouns, "pronouns"));
      if (subtypes?.length) {
        meta.array!.push(createPart(" "));
      }
    }
    for (let i = 0; i < subtypes.length; i++) {
      if (i > 0) {
        meta.array!.push(createPart(", "));
      }
      meta.array!.push(createPart(subtypes[i].string, "subtype"));
    }
    meta.array!.push(createPart(")"));
  }
  meta.array!.push(createPart(", "));
  meta.array! = meta.array!.concat(
    character.statistics?.alignment?.array || []
  );

  meta.string = meta.array!.reduce((acc, obj) => acc + obj.string, "");

  character.statistics!.meta = meta;
}
