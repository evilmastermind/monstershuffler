import { Character, Actions } from "@/types/objects";
import { capitalizeFirst } from "@/utils/functions";
import { resolveRandomName } from "@/utils/parsers";
import { objects } from "@/utils/constants";

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
  tags.race = c?.race?.name || "Race";

  // actions with random names
  for (const object in objects) {
    if (!Object.hasOwn(c, object)) {
      continue;
    }
    // @ts-expect-error Object.hasOwn not accepted by TypeScript
    const actions = c[object]?.actions as Actions;
    if (!actions.length) {
      continue;
    }
    actions.forEach((action) => {
      const variants = action.variants;
      let currentVariant = variants[0];
      tags[action.tag] = currentVariant.name;
      const currentUnitValue =
        action.availableUnit === "level"
          ? character.statistics!.level
          : character.statistics!.CR;
      variants.forEach((variant) => {
        variant.name = resolveRandomName(variant.name);
        if (
          variant?.availableAt >= currentUnitValue &&
          variant?.availableAt > currentVariant.availableAt
        ) {
          tags[action.tag] = variant.name;
          currentVariant = variant;
          if (Object.hasOwn(variant, "attacks")) {
            variant.attacks.forEach((attack) => {
              if (attack.replaceName) {
                tags[action.tag] = attack.name;
              }
            });
          }
        }
      });
    });
  }
}
