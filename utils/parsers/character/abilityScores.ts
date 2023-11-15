import {
  getBonus,
  getPrioritizedStatistic,
  calibrateStatistic,
} from "../functions";
import { Character, Abilities } from "@/types";
import { random } from "@/utils/functions";

type AbilityScore = {
  value: number;
  isAutomaticCalcDisabled?: number;
};

type Ability = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";

export function calculateAbilityScores(character: Character) {
  const c = character.character;
  // @ts-expect-error
  character.statistics!.abilityScores = {};
  // @ts-expect-error
  character.statistics!.abilityModifiers = {};
  const abilities: Ability[] = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
  createKeyIfUndefined(c, "abilityScores");
  if (!c.abilityScores) {
    c.abilityScores = {};
  }
  const abilitiesLimit =
    getPrioritizedStatistic<number>(character, "abilitiesLimit") || 30;
  for (const abilityName of abilities) {
    // generating abilities scores if they don't exist yet
    // base Ability Score = 3d6, min 8;
    if (c.abilityScores[abilityName] === undefined) {
      c.abilityScores[abilityName] = {
        value: random(1, 6) + random(1, 6) + random(1, 6),
      };
    }
    if (c.abilityScores[abilityName]!.value < 8) {
      c.abilityScores[abilityName]!.value = 8;
    }

    // checking if there's a template applied to the creature with
    // a minimum score for this ability
    if (
      c?.template?.abilityScores &&
      Object.hasOwn(c.template.abilityScores, abilityName) &&
      c.abilityScores[abilityName]!.value <
        c.template.abilityScores[abilityName]!.value
    ) {
      c.abilityScores[abilityName]!.value =
        c.template.abilityScores[abilityName]!.value;
    }
    let abilityScoreTotal: number = c.abilityScores[abilityName]!.value;

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
    character.statistics!.abilityScores[abilityName] = abilityScoreTotal;
    character.statistics!.abilityModifiers[abilityName] =
      Math.floor(abilityScoreTotal / 2) - 5;
    // variables
    character.variables![abilityName] =
      character.statistics!.abilityModifiers[abilityName];
    character.variables![`${abilityName}VALUE`] = abilityScoreTotal;
  }
}
