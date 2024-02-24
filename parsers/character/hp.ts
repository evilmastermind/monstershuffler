import { type Character } from "@/types";
import { sizeStats, type Size, getBonus, calibrateStatistic } from "@/parsers";

export function calculateHitPoints(
  character: Character,
  addBonus = true,
  calibrate = true
) {
  const s = character.statistics!;
  const v = character.variables!;
  const size = s!.size.number;
  const HitDice = s!.level;

  const die = sizeStats[size.toString() as Size].hitDice;

  const HPFromHitDice = Math.floor(HitDice * ((die + 1) / 2));
  const HPFromConstitution = HitDice * v!.CON;
  const HPBonus = addBonus ? getBonus(character, "HP") : 0;
  let HPTotal = HPFromHitDice + HPFromConstitution + HPBonus;
  if (HPTotal < 1) {
    HPTotal = 1;
  }

  // ------- automatic calculation (CR) -------
  if (character.character?.CRCalculation?.name === "automatic" && calibrate) {
    HPTotal = calibrateStatistic(character, HPTotal, "HP");
  }
  // HP text
  let HPText = "";
  if (HPFromConstitution > 0) {
    HPText = ` + ${HPFromConstitution}`;
  } else if (HPFromConstitution < 0) {
    HPText = ` - ${Math.abs(HPFromConstitution)}`;
  }
  if (HPBonus > 0) {
    HPText = ` + ${HPBonus}`;
  } else if (HPBonus < 0) {
    HPText = ` - ${Math.abs(HPBonus)}`;
  }
  // statistics
  s.HP = {
    string: `${HPTotal} (${HitDice}d${die}${HPText})`,
    number: HPTotal,
  };
  // variables
  v.HP = HPTotal;
}
