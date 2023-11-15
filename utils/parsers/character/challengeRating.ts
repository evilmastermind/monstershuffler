import { Character } from "@/types";
import {
  challengeStats,
  getChallengeString,
  getChallengeNumber,
} from "@/utils/parsers/stats";

export function calculateChallengeRating(character: Character) {
  if (character?.variations?.currentCR) {
    assignChallengeRating(
      character,
      character.variations.currentCR,
      getChallengeString(character.variations.currentCR)
    );
    return;
  }
  const c = character.character;
  const level = character.statistics!.level;
  let CR = 0;
  // two-point calculation:
  // the cr of a creature is given by the user at two different levels
  //
  // LVL
  //  |          /
  //  |         x
  //  |        /
  //  |       /
  //  |      x
  //  |     /
  // _|_______________ CR
  //  |
  //
  // all the other CRs per level are then calculated with the "line between two points" equation
  // https://en.wikipedia.org/wiki/Linear_equation#Two-point_form
  //

  if (c?.CRCalculation?.name === "twopoints") {
    // x = Level, y = CR
    const x1 = parseFloat(c.CRCalculation.x1) || 1;
    const y1 = parseFloat(c.CRCalculation.y1) || 0;
    const x2 = parseFloat(c.CRCalculation.x2) || 20;
    const y2 = parseFloat(c.CRCalculation.y2) || 12;
    CR = ((level - x1) * (y2 - y1)) / (x2 - x1) + y1;
  } else if (c?.CRCalculation?.name === "npcstandard") {
    if (level === 0) {
      CR = -3;
    } else if (level === 1) {
      CR = -1;
    } else if (level === 2) {
      CR = 0;
    } else if (level === 3) {
      CR = 1;
    } else {
      CR = Math.floor((level / 5) * 3);
    }
  } else if (c?.CRCalculation?.name === "automatic") {
    CR = c.CRCalculation.CR || 0;
  }
  assignChallengeRating(character, CR, getChallengeString(CR));
}

export function recalculateChallengeRatingAfterAutomaticHP(
  character: Character
) {
  const CR = character?.variations?.currentCR || character.variables!.CR || 0;
  assignChallengeRating(character, CR, getChallengeString(CR));
}

function assignChallengeRating(
  character: Character,
  CR: number,
  CRString: string
) {
  // statistics
  character.statistics!.CR = {
    number: CR,
    string: CRString,
  };
  // variables
  character.statistics!.XP =
    // @ts-expect-error CRString is a valid key
    CR <= 30 ? challengeStats[CRString].xp.toString() : "???";
  character.variables!.CR = CR;
}
