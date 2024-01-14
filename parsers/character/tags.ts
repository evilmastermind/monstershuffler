import { getStatArrayFromObjects, getCurrentStatLimit } from "../functions";
import type { Character, ChosenAction } from "@/types";
import { capitalizeFirst } from "@/utils";
import { calculateRandomName } from "@/parsers";

export function createTags(character: Character) {
  const c = character.character;
  const tags = character.tags!;

  // TODO: translate the article. It's possible that some languages will have different ways to handle this.
  tags.name = c?.generic
    ? `the ${c.name.toLowerCase() || "the name"}`
    : c?.name || "Name";
  tags.Name = capitalizeFirst(tags.name);

  const pronouns = character.statistics?.pronouns || "thing";

  switch (pronouns) {
    case "male":
      tags.he = "he";
      tags.she = "he";
      tags.his = "his";
      tags.her = "his";
      tags.him = "him";
      tags.hers = "his";
      tags.He = "He";
      tags.His = "His";
      tags.Him = "Him";
      tags.Hers = "His";
      tags.they = "he";
      tags.their = "his";
      tags.them = "him";
      tags.theirs = "his";
      tags.They = "He";
      tags.Their = "His";
      tags.Them = "Him";
      tags.Theirs = "His";
      tags.it = "he";
      tags.its = "his";
      tags.It = "He";
      tags.Its = "His";
      break;
    case "female":
      tags.he = "she";
      tags.she = "she";
      tags.his = "her";
      tags.her = "her";
      tags.him = "her";
      tags.hers = "hers";
      tags.He = "She";
      tags.His = "Her";
      tags.Him = "Her";
      tags.Hers = "Hers";
      tags.they = "she";
      tags.their = "her";
      tags.them = "her";
      tags.theirs = "hers";
      tags.They = "She";
      tags.Their = "Her";
      tags.Them = "Her";
      tags.Theirs = "Hers";
      tags.it = "she";
      tags.its = "her";
      tags.It = "She";
      tags.Its = "Her";
      break;
    case "neutral":
      tags.he = "they";
      tags.she = "they";
      tags.his = "their";
      tags.her = "their";
      tags.him = "them";
      tags.hers = "theirs";
      tags.He = "They";
      tags.His = "Their";
      tags.Him = "Them";
      tags.Hers = "Theirs";
      tags.they = "they";
      tags.their = "their";
      tags.them = "them";
      tags.theirs = "theirs";
      tags.They = "They";
      tags.Their = "Their";
      tags.Them = "Them";
      tags.Theirs = "Theirs";
      tags.it = "they";
      tags.its = "their";
      tags.It = "They";
      tags.Its = "Their";
      break;
    default:
      tags.he = "it";
      tags.she = "it";
      tags.his = "its";
      tags.her = "its";
      tags.him = "it";
      tags.hers = "theirs";
      tags.He = "It";
      tags.His = "Its";
      tags.Him = "It";
      tags.Hers = "Theirs";
      tags.they = "it";
      tags.their = "its";
      tags.them = "it";
      tags.theirs = "theirs";
      tags.They = "It";
      tags.Their = "Its";
      tags.Them = "It";
      tags.Theirs = "Theirs";
      tags.it = "it";
      tags.its = "its";
      tags.It = "It";
      tags.Its = "Its";
      break;
  }

  // race
  tags.race = c?.racevariant?.name || c?.race?.name || "Race";

  // action tags
  const actions = getStatArrayFromObjects<ChosenAction[]>(
    character,
    "actions"
  ).flat();

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    const limit = getCurrentStatLimit(character);

    if (
      !action?.variants?.length ||
      (action?.availableUntil && limit > action?.availableUntil)
    ) {
      continue;
    }

    let variant = action.variants[0];
    let variantName = (variant.name = calculateRandomName(variant.name));

    // resolving random names for actions
    for (const v of action.variants) {
      v.name = calculateRandomName(v.name);
      const availableAt = v.availableAt ?? -3;
      const currentAvailableAt = variant ? variant.availableAt ?? -3 : -3;
      if (availableAt <= limit && availableAt >= currentAvailableAt) {
        variant = v;
        variantName = v.name;
      }
    }

    // actions that use the name of the attack (weapon)
    if (Object.hasOwn(variant, "attacks")) {
      variant?.attacks?.forEach((attack) => {
        if (
          attack.replaceName &&
          attack?.attributes &&
          "name" in attack?.attributes &&
          attack?.attributes?.name
        ) {
          variantName = attack.attributes.name;
        }
      });
    }

    tags[action.tag] = variantName;
  }
}
