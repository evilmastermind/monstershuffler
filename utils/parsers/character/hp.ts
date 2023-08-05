import { Character } from "@/types/objects";
import { sizeStats, Size, getBonus } from "@/utils/parsers";

export function calculateHitPoints(character: Character) {
  const s = character.statistics!;
  const size = s!.size;
  const HitDice = s!.level;

  const die = sizeStats[size.toString() as Size].hitDice;

  const HPFromHitDice = Math.floor(HitDice * ((die + 1) / 2));
  const HPFromConstitution = HitDice * s!.abilityModifiers.CON;
  const HPBonus = getBonus(character, "HP");
  const HPAdditional = HPFromConstitution + HPBonus;
  const HPTotal =
    HPFromHitDice + HPAdditional < 1 ? 1 : HPFromHitDice + HPAdditional;

  let HPText = "";
  if (HPAdditional > 0) {
    HPText = ` + ${HPAdditional}`;
  } else if (HPAdditional < 0) {
    HPText = ` - ${Math.abs(HPAdditional)}`;
  }
  // statistics
  s.HP.string = `${HPTotal} (${HitDice}d${die}${HPText})`;
  s.HP.value = HPTotal;
  // variables
  character.variables!.HP = HPTotal;
}
