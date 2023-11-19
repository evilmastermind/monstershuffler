import JSPath from "jspath";
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

  for (const type of speedTypes) {
    const speedString = getPrioritizedStatisticFromPath<string>(
      character,
      `.speeds.${type}`
    );
    if (!speedString) {
      continue;
    }
    if (!s.speeds) {
      s.speeds = {
        string: "",
      };
    }
    const speedBonus = getBonus(character, type);
    const speedNumber =
      parseExpressionNumeric(speedString, character) + speedBonus;
    switch (type) {
      case "walk":
        s.speeds!.walk = speedNumber;
        v.SPEED = speedNumber;
        s.speeds!.string = unshiftWithComma(
          s.speeds!.string,
          `${speedString} ft`
        );
        break;
      case "fly":
        s.speeds!.fly = speedNumber;
        v.FLY = speedNumber;
        s.speeds!.string = pushWithComma(
          s.speeds!.string,
          `fly ${speedNumber} ft`
        );
        break;
      case "climb":
        s.speeds!.climb = speedNumber;
        v.CLIMB = speedNumber;
        s.speeds!.string = pushWithComma(
          s.speeds!.string,
          `climb ${speedNumber} ft`
        );
        break;
      case "swim":
        s.speeds!.swim = speedNumber;
        v.SWIM = speedNumber;
        s.speeds!.string = pushWithComma(
          s.speeds!.string,
          `swim ${speedNumber} ft`
        );
        break;
      case "burrow":
        s.speeds!.burrow = speedNumber;
        v.BURROW = speedNumber;
        s.speeds!.string = pushWithComma(
          s.speeds!.string,
          `burrow ${speedNumber} ft`
        );
        break;
      case "hover":
        s.speeds!.hover = speedNumber;
        v.HOVER = speedNumber;
        s.speeds!.string = pushWithComma(
          s.speeds!.string,
          `fly ${speedNumber} ft (hover)`
        );
        break;
    }
  }
}
