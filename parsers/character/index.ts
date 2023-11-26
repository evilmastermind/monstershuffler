import {
  calculateChallengeRating,
  recalculateChallengeRatingAfterAutomaticHP,
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
import { calculateDamageVulnerabilities } from "./damageVulnerabilities";
import { calculateDamageResistances } from "./damageResistances";
import { calculateConditionImmunities } from "./conditionImmunities";
import { calculateDamageImmunities } from "./damageImmunities";
import { calculateSenses } from "./senses";
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
     * The automatic calculation is "CR-Based": the initial CR, chosen by the user, determines
     * the hit points, the ability scores, and the size, with which we can calculate the number
     * of Hit Dice.
     */
    // === this part uses the original CR to calculate the statistics needed to know the creature's HP
    calculateChallengeRating(character);
    calculateLevel(character); // using the original CR
    calculateSize(character); // original the original CR
    calculateAbilityScores(character); // using the original CR
    calculateHitPoints(character); // using original CR, then recalibrating with the new CR
    // === now that we have the creature's HP, we can recalibrate it for the new CR and get the new level
    recalculateChallengeRatingAfterAutomaticHP(character);
    calculateSize(character);
    calculateAbilityScores(character);
    recalculateLevelAfterAutomaticHP(character);
    calculateProficiency(character);
    calculateHitPoints(character);
  } else {
    /*
      TWO-POINTS METHOD / NPC STANDARD
      The other two calculations (two-points method and NPC standard) are "Level-Based":
      we calculate the level first, then the CR, and everything else is calculated from there.
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
  calculateDamageVulnerabilities(character);
  calculateDamageResistances(character);
  calculateDamageImmunities(character);
  calculateConditionImmunities(character);
  calculateSenses(character);
  calculateLanguages(character);
}
