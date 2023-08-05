import { Character } from "@/types/objects";
import { getStatArrayFromObjects } from "@/utils/parsers/functions";

export function calculateLevel(character: Character) {
  const c = character.character;

  let level = 0;
  const HD = getStatArrayFromObjects<number>(character, "HD");
  HD.forEach((hd) => {
    level += hd;
  });
  if (level === 0) {
    level = 1;
  }

  character.statistics!.level = level;
  character.variables!.LVL = level;
}
