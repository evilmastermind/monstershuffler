import {
  calculateChallengeRating,
  assignNewChallengeRating,
} from "./challengeRating";
import { calculateAlignment } from "./alignment";
import { calculateName } from "./name";
import { calculateLevel, recalculateLevelAfterAutomaticHP } from "./level";
import { calculateProficiency } from "./proficiency";
import { calculateSize } from "./size";
import { calculateAbilityScores } from "./abilityScores";
import { calculateHitPoints } from "./hp";
import { calculatePronouns } from "./pronouns";
import { calculateCharacterHook } from "./characterHook";
import { calculateType } from "./type";
import { createTags } from "./tags";
import { calculateSubtype } from "./subtype";
import { calculateMeta } from "./meta";
import { calculateArmorClass } from "./ac";
import { calculateLanguages } from "./languages";
import { calculateSpeed } from "./speed";
import { calculateSavingThrows } from "./savingThrows";
import { calculateSkills } from "./skills";
import { calculateVulnerabilities } from "./damageVulnerabilities";
import { calculateResistances } from "./damageResistances";
import { calculateConditionImmunities } from "./conditionImmunities";
import { calculateImmunities } from "./damageImmunities";
import { calculateSenses } from "./senses";
import { calculateActions } from "./actions";
import { calculateSpells } from "./spells";
import type { Character } from "@/types";

export function createStats(character: Character) {
  createKeyIfUndefined(character, "statistics");
  createKeyIfUndefined(character, "variables");
  createKeyIfUndefined(character, "tags");
  createKeyIfUndefined(character, "variations");
  /// /// ///
  /// /// ///
  const CRCalculation = character.character.CRCalculation?.name;
  if (CRCalculation === "automatic") {
    /**
     * AUTOMATIC
     * The user creates a monster, gives it some hit dice and chooses an appropriate CR.
     * When increasing or decreasing the CR, some stats like hit points and ability scores
     * are calibrated automatically (unless the user added 'expressions' to them already).
     *
     * "Calibrating" stats:
     * This recalculation is based on a table which contains the average values for the
     * most important stats from CR 1 to CR 30. By determining the increase factor of
     * the average values between the original CR and the new one chosen by the user,
     * we can estimate the new values by multiplying the original values by that
     * increase factor.
     *
     * PHASE 1: use the original CR to determine the original hit points
     */
    calculateChallengeRating(character, false);
    calculateLevel(character);
    calculateSize(character);
    calculateAbilityScores(character);
    /**
     * the hit points are calculated here for the first time, using the origingal
     * hit dice, size, and ability scores. With the "calibration" method mentioned above,
     * the hit points for the new challenge rating are then estimated.
     */
    calculateHitPoints(character, false);
    /**
     * PHASE 2: use the new CR to calculate all stats
     */
    assignNewChallengeRating(character);
    // TODO: warn the user that, because of this new automatic calculation,
    // it's no longer possible to use the variable LVL for Size and Ability Scores
    calculateSize(character);
    calculateAbilityScores(character);
    /**
     * the level here is calculated from the hit points estimated for the new CR.
     */
    recalculateLevelAfterAutomaticHP(character);
    calculateProficiency(character);
    /**
     * the hit points are finally calculated using the new level
     */
    calculateHitPoints(character, true, false);
  } else {
    /**
     * TWO-POINTS METHOD / NPC STANDARD
     * The other two calculations (two-points method and NPC standard) are "Level-Based":
     * we calculate the level first, then the CR, and everything else is calculated
     * from there.
     */
    calculateLevel(character);
    calculateChallengeRating(character);
    calculateProficiency(character);
    calculateAbilityScores(character);
    calculateSize(character);
    calculateHitPoints(character);
  }
  /// /// ///
  calculateName(character);
  calculatePronouns(character);
  calculateAlignment(character);
  createTags(character);
  /// /// ///
  calculateCharacterHook(character);
  /// /// ///
  calculateType(character);
  calculateSubtype(character);
  calculateMeta(character);
  /// /// ///
  calculateArmorClass(character);
  calculateSpeed(character);
  /// /// ///
  calculateSavingThrows(character);
  calculateSkills(character);
  calculateVulnerabilities(character);
  calculateResistances(character);
  calculateImmunities(character);
  calculateConditionImmunities(character);
  calculateSenses(character);
  calculateLanguages(character);
  /// /// ///
  calculateActions(character);
  calculateSpells(character);
  // console.log(character);
}
