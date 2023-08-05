import { calculateChallengeRating } from "./challengeRating";
import { calculateAlignment } from "./alignment";
import { calculateName } from "./name";
import { calculateLevel } from "./level";
import { calculateProficiency } from "./proficiency";
import { calculateSize } from "./size";
import { calculateAbilityScores } from "./abilityScores";
import { Character } from "@/types/objects";
import { hasDefined, random } from "@/utils/functions";

export function createStats(character: Character) {
  createKeyIfUndefined(character, "statistics");
  createKeyIfUndefined(character, "variables");

  calculateAlignment(character);
  calculateName(character);

  const CRCalculation = character.character.CRCalculation?.name;
  if (CRCalculation === "automatic") {
    /* 
      AUTOMATIC
      The automatic calculation is "CR-Based": the initial CR, chosen by the user, determines
      the hit points, the ability scores, and the size, with which we can calculate the number
      of Hit Dice.
    */
    calculateChallengeRating(character);
    calculateSize(character);
    calculateAbilityScores(character);
    // hit points
    calculateLevel(character);
    calculateProficiency(character);
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
  }
}
