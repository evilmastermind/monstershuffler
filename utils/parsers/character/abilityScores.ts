import { getBonus, getPrioritizedStatistic } from "../functions";
import { Character } from "@/types/objects";
import { random } from "@/utils/functions";

export function calculateAbilityScores(character: Character) {
  const c = character.character;
  const abilities = { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 };
  const abilitiesBase = c.abilitiesBase;
  const abilitiesLimit =
    getPrioritizedStatistic<string>(character, "abilitiesLimit") || 30;
  for (const ability in abilities) {
    // generating abilities scores if they don't exist yet
    // base Ability Score = 3d6, min 8;
    if (!abilitiesBase[ability]) {
      abilitiesBase[ability] = random(1, 6) + random(1, 6) * random(1, 6);
      if (abilitiesBase[ability] < 8) abilitiesBase[ability] = 8;
    }
    // checking if there's a template applied to the creature with
    // a minimum score for this ability
    if (
      c?.template?.abilitiesBase &&
      Object.hasOwn(c.template.abilitiesBase, ability)
    ) {
      // @ts-expect-error Object.hasOwn not recognized by TS
      if (abilitiesBase[ability] < c.template.abilitiesBase[ability]) {
        // @ts-expect-error Object.hasOwn not recognized by TS
        abilitiesBase[ability] = c.template.abilitiesBase[ability];
      }
    }
    // ability score bonus
    abilitiesBase[ability] += getBonus(character, ability);
    // normalizing ability scores out of bounds
    if (abilitiesBase[ability] > abilitiesLimit) {
      abilitiesBase[ability] = abilitiesLimit;
    } else if (abilitiesBase[ability] < 1) {
      abilitiesBase[ability] = 1;
    }
    // statistics
    // @ts-expect-error I should have defined a type for the keys in the object in the backend, but I currently could not import it here anyway
    character.statistics!.abilityScores[ability] = abilitiesBase[ability];
    character.statistics!.abilityModifiers[ability] =
      Math.floor(abilitiesBase[ability] / 2) - 5;
    // variables
    // @ts-expect-error I should have defined a type for the keys in the object in the backend, but I currently could not import it here anyway
    character.variables![ability] =
      character.statistics!.abilityModifiers[ability];
    // @ts-expect-error I should have defined a type for the keys in the object in the backend, but I currently could not import it here anyway
    character.variables![`${ability}VALUE`] = abilitiesBase[ability];
  }
}
