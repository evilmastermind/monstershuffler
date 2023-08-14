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
import { Character } from "@/types/objects";

export function createStats(character: Character) {
  createKeyIfUndefined(character, "statistics");
  createKeyIfUndefined(character, "variables");
  createKeyIfUndefined(character, "tags");
  createKeyIfUndefined(character, "variations");
  /// /// ///
  calculateName(character);
  calculateAlignment(character);
  calculatePronouns(character);
  calculateCharacterHook(character);
  /// /// ///
  const CRCalculation = character.character.CRCalculation?.name;
  if (CRCalculation === "automatic") {
    /**
     * AUTOMATIC
     * The automatic calculation is "CR-Based": the initial CR, chosen by the user, determines
     * the hit points, the ability scores, and the size, with which we can calculate the number
     * of Hit Dice.
     *
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
    console.log(character.statistics);
    calculateSize(character);
    calculateHitPoints(character);
  }
  /// /// ///
}
