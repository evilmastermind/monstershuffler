import { parseExpressionNumeric } from "./expressions";
import { Character, Bonus } from "@/types/objects";
import { objects } from "@/utils/constants";

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

export function getBonusesForOneStatistic(
  character: Character,
  stat: string
): Bonus[] {
  const c = character.character;
  const bonuses: Bonus[] = [];
  objects.forEach((raceOrClassEtc) => {
    if (Object.hasOwn(c, raceOrClassEtc)) {
      // @ts-ignore TODO: f*** you, TypeScript
      if (Object.hasOwn(c[raceOrClassEtc], "bonuses")) {
        // @ts-ignore
        if (Object.hasOwn(c[raceOrClassEtc].bonuses, `${stat}Bonus`)) {
          // @ts-ignore
          bonuses.push(c[raceOrClassEtc].bonuses[`${stat}Bonus`]);
        }
      }
    }
  });
  return bonuses;
}

export function getBonus(character: Character, stat: string): number {
  const bonuses = getBonusesForOneStatistic(character, stat);
  let bonus = 0;
  bonuses.forEach((b) => {
    bonus += parseExpressionNumeric(b.value, character.variables!);
  });
  return bonus;
}

export function getPrioritizedStatistic<T>(character: Character, key: string) {
  const c = character.character;
  for (let i = 0; i < objects.length; i++) {
    if (Object.hasOwn(c, objects[i])) {
      // @ts-ignore
      if (Object.hasOwn(c[objects[i]], key)) {
        // @ts-ignore
        return c[objects[i]][key] as T;
      }
    }
  }
  if (Object.hasOwn(c, key)) {
    // @ts-ignore
    return c[key] as T;
  }
}
