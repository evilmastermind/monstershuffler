import { sizeStats, Size } from "@/parsers";
import { Character } from "@/types";
import { getStatArrayFromObjects } from "@/parsers/functions";

export function calculateLevel(character: Character) {
  // level-based calculation when the level has been already
  // calculated  once
  if (
    character?.variations?.currentHD !== undefined &&
    character?.character?.CRCalculation?.name !== "automatic"
  ) {
    assignLevel(character, character.variations.currentHD);
    return;
  }
  // level-based CR calculation when the level has not been
  // calculated yet, or automatic calculation on its first phase

  let level = 0;
  const HD = getStatArrayFromObjects<number>(character, "HD");
  HD.forEach((hd) => {
    level += hd;
  });
  if (level === 0) {
    level = 1;
  }
  character.variations!.currentHD = level;
  assignLevel(character, level);
}

function assignLevel(character: Character, level: number) {
  // statistics
  character.statistics!.level = level;
  // variables
  character.variables!.LVL = level;
}

/** ------- automatic calculation (CR) -------
 * This function is called after the HP have been adjusted to the new CR
 * when the Challenge Rating Calculation is set to automatic.
 */
export function recalculateLevelAfterAutomaticHP(character: Character) {
  const v = character.variables!;
  const HP = v.HP;
  const CON = v.CON;
  const size = v.SIZE;
  const die = sizeStats[size.toString() as Size].hitDice;
  let level = Math.floor(HP / ((die + 1) / 2 + CON));
  if (level === 0) {
    level = 1;
  }
  character.statistics!.level = level;
  character.variables!.LVL = level;
  character.variations!.currentHD = level;
}
