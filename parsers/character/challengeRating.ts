import type { Character } from "@/types";
import {
  challengeStats,
  getChallengeString,
  getChallengeNumber,
} from "@/parsers/stats";

export function calculateChallengeRating(
  character: Character,
  assignToVariations = true
) {
  if (character?.variations?.currentCR !== undefined) {
    assignChallengeRating(
      character,
      character.variations.currentCR,
      getChallengeString(character.variations.currentCR)
    );
    return;
  }
  const level = character.statistics!.level;
  const c = character.character;
  let CR = 0;

  if (c?.CRCalculation?.name === "twopoints") {
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
    // x = Level, y = CR
    const x1 = parseFloat(c.CRCalculation.x1) || 1;
    const y1 = parseFloat(c.CRCalculation.y1) || 0;
    const x2 = parseFloat(c.CRCalculation.x2) || 20;
    const y2 = parseFloat(c.CRCalculation.y2) || 12;
    CR = ((level - x1) * (y2 - y1)) / (x2 - x1) + y1;
  } else if (c?.CRCalculation?.name === "npcstandard") {
    // NPC standard calculation:
    // CR 1/4 = LVL 1
    // CR 1/2 = LVL 2
    // CR 1   = LVL 3
    // ...
    // CR 12  = LVL 20
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
  if (assignToVariations) {
    character.variations!.currentCR = CR;
  }
  assignChallengeRating(character, CR, getChallengeString(CR));
}

export function assignNewChallengeRating(character: Character) {
  let CR = character?.variations?.currentCR;
  if (CR === null || CR === undefined) {
    CR = character.variables!.CR || 0;
  }
  character.variations!.currentCR = CR;
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
