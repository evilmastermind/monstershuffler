import { Character } from "@/types";
import { sizeStats, Size, getBonus, calibrateStatistic } from "@/utils/parsers";

export function calculateHitPoints(character: Character) {
  const s = character.statistics!;
  const size = s!.size.number;
  const HitDice = s!.level;

  const die = sizeStats[size.toString() as Size].hitDice;

  const HPFromHitDice = Math.floor(HitDice * ((die + 1) / 2));
  const HPFromConstitution = HitDice * s!.abilityModifiers.CON;
  const HPBonus = getBonus(character, "HP");
  const HPAdditional = HPFromConstitution + HPBonus;
  let HPTotal =
    HPFromHitDice + HPAdditional < 1 ? 1 : HPFromHitDice + HPAdditional;
  // ------- automatic calculation (CR) -------
  if (character.character?.CRCalculation?.name === "automatic") {
    HPTotal = calibrateStatistic(character, HPTotal, "HP");
  }
  // HP text
  let HPText = "";
  if (HPAdditional > 0) {
    HPText = ` + ${HPAdditional}`;
  } else if (HPAdditional < 0) {
    HPText = ` - ${Math.abs(HPAdditional)}`;
  }
  // statistics
  s.HP = {
    string: `${HPTotal} (${HitDice}d${die}${HPText})`,
    number: HPTotal,
  };
  // variables
  character.variables!.HP = HPTotal;
}
