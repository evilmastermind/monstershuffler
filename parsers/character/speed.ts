import {
  getBonus,
  getPrioritizedStatisticFromPath,
  parseExpressionNumeric,
  pushWithComma,
  unshiftWithComma,
} from "../functions";
import { speedTypes } from "../stats";
import { Character } from "@/types";

export function calculateSpeed(character: Character) {
  const s = character.statistics!;
  const v = character.variables!;
  s.speeds = {
    string: "",
    values: {},
  };
  for (const type of speedTypes) {
    const speedExpression = getPrioritizedStatisticFromPath<string>(
      character,
      `.speeds.${type}`
    );
    if (!speedExpression) {
      continue;
    }
    const speedBonus = getBonus(character, type);
    const speedNumber =
      parseExpressionNumeric(speedExpression, character) + speedBonus;
    switch (type) {
      case "walk":
        s.speeds!.values.walk = (s.speeds!.values.walk || 0) + speedNumber;
        if (s.speeds!.values.walk > 0) {
          s.speeds!.string = unshiftWithComma(
            s.speeds!.string,
            `${speedNumber} ft`
          );
        } else {
          s.speeds!.values.walk = 0;
        }
        break;
      case "fly":
        s.speeds!.values.fly = speedNumber;
        if (s.speeds!.values.fly > 0) {
          s.speeds!.string = pushWithComma(
            s.speeds!.string,
            `fly ${speedNumber} ft`
          );
        } else {
          delete s.speeds!.values.fly;
        }
        break;
      case "climb":
        s.speeds!.values.climb = speedNumber;
        if (s.speeds!.values.climb > 0) {
          s.speeds!.string = pushWithComma(
            s.speeds!.string,
            `climb ${speedNumber} ft`
          );
        } else {
          delete s.speeds!.values.climb;
        }
        break;
      case "swim":
        s.speeds!.values.swim = speedNumber;
        if (s.speeds!.values.swim > 0) {
          s.speeds!.string = pushWithComma(
            s.speeds!.string,
            `swim ${speedNumber} ft`
          );
        } else {
          delete s.speeds!.values.swim;
        }
        break;
      case "burrow":
        s.speeds!.values.burrow = speedNumber;
        v.BURROW = speedNumber;
        if (s.speeds!.values.burrow > 0) {
          s.speeds!.string = pushWithComma(
            s.speeds!.string,
            `burrow ${speedNumber} ft`
          );
        } else {
          delete s.speeds!.values.burrow;
        }
        break;
      case "hover":
        s.speeds!.values.hover = speedNumber;
        v.HOVER = speedNumber;
        if (s.speeds!.values.hover > 0) {
          s.speeds!.string = pushWithComma(
            s.speeds!.string,
            `fly ${speedNumber} ft (hover)`
          );
        } else {
          delete s.speeds!.values.hover;
        }
        break;
    }
    v.SPEED = s.speeds!.values.walk || 0;
    v.FLY = s.speeds!.values.fly || 0;
    v.CLIMB = s.speeds!.values.climb || 0;
    v.SWIM = s.speeds!.values.swim || 0;
    v.BURROW = s.speeds!.values.burrow || 0;
    v.HOVER = s.speeds!.values.hover || 0;
  }
  if (!s.speeds.string) {
    delete s.speeds;
  }
}
