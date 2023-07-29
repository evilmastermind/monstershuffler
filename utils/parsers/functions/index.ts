import { objects } from "@/utils/constants";
import { Character } from "@/types/objects";

export function getStatArrayFromObjects<T>(character: Character, stat: string) {
  const c = character.character;
  const array: T[] = [];
  // retrieving alignment arrays from objects
  if (Object.hasOwn(c, stat)) {
    // @ts-ignore
    array.push(c[stat]);
  }
  objects.forEach((raceOrClassEtc) => {
    if (Object.hasOwn(c, raceOrClassEtc)) {
      // @ts-ignore TODO: f*** you, TypeScript
      if (Object.hasOwn(c[raceOrClassEtc], stat)) {
        // @ts-ignore
        array.push(c[raceOrClassEtc][stat]);
      }
    }
  });
  return array;
}
