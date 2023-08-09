import {
  getBonus,
  getPrioritizedStatistic,
  calibrateStatistic,
} from "../functions";
import { Character } from "@/types/objects";
import { random } from "@/utils/functions";

type AbilityScore = {
  value: number;
  isAutomaticCalcDisabled?: number;
};

type Ability = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";

type AbilityScores = {
  [key in Ability]: AbilityScore;
};

export function calculateAbilityScores(character: Character) {
  const c = character.character;
  const abilities: Ability[] = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
  createKeyIfUndefined(c, "abilityScores");
  const abilityScores = c.abilityScores;
  const abilitiesLimit =
    getPrioritizedStatistic<number>(character, "abilitiesLimit") || 30;
  for (const abilityName in abilities) {
    // generating abilities scores if they don't exist yet
    // base Ability Score = 3d6, min 8;
    if (!Object.hasOwn(abilityScores, abilityName)) {
      abilityScores[abilityName] = {
        value: random(1, 6) + random(1, 6) * random(1, 6),
      };
    }
    if (abilityScores[abilityName].value < 8) {
      abilityScores[abilityName].value = 8;
    }

    // checking if there's a template applied to the creature with
    // a minimum score for this ability
    if (
      c?.template?.abilityScores &&
      Object.hasOwn(c.template.abilityScores, abilityName) &&
      abilityScores[abilityName].value <
        // @ts-expect-error Object.hasOwn not recognized by TS
        c.template.abilityScores[abilityName].value
    ) {
      abilityScores[abilityName].value =
        // @ts-expect-error Object.hasOwn not recognized by TS
        c.template.abilityScores[abilityName].value;
    }
    let abilityScoreTotal: number = abilityScores[abilityName].value;

    // ability score bonus
    abilityScoreTotal += getBonus(character, abilityName);
    // ------- automatic calculation (CR) -------
    if (c?.CRCalculation?.name === "automatic") {
      abilityScoreTotal = calibrateStatistic(
        character,
        abilityScoreTotal,
        "abilityScoresAvg"
      );
    }

    // normalizing ability scores out of bounds
    if (abilityScoreTotal > abilitiesLimit) {
      abilityScoreTotal = abilitiesLimit;
    } else if (abilityScoreTotal < 1) {
      abilityScoreTotal = 1;
    }
    // statistics
    // @ts-expect-error I should have defined a type for the keys in the object in the backend, but I currently could not import it here anyway
    character.statistics!.abilityScores[abilityName] = abilityScoreTotal;
    character.statistics!.abilityModifiers[abilityName] =
      Math.floor(abilityScoreTotal / 2) - 5;
    // variables
    // @ts-expect-error I should have defined a type for the keys in the object in the backend, but I currently could not import it here anyway
    character.variables![abilityName] =
      character.statistics!.abilityModifiers[abilityName];
    // @ts-expect-error I should have defined a type for the keys in the object in the backend, but I currently could not import it here anyway
    character.variables![`${ability}VALUE`] = abilityScoreTotal;
  }
}
