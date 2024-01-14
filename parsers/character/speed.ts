import {
  addCommaIfNotEmpty,
  createPart,
  getBonus,
  getPrioritizedStatisticFromPath,
  parseExpressionNumeric,
} from "../functions";
import { speedTypes } from "../stats";
import type { Character } from "@/types";

export function calculateSpeed(character: Character) {
  const s = character.statistics!;
  const v = character.variables!;
  s.speeds = {
    string: "",
    array: [],
  };

  type Speeds = "walk" | "fly" | "climb" | "swim" | "burrow" | "hover";

  const speeds: { [key in Speeds]: number } = {
    walk: 0,
    fly: 0,
    climb: 0,
    swim: 0,
    burrow: 0,
    hover: 0,
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

    if (speedNumber <= 0) {
      continue;
    }

    addCommaIfNotEmpty(s.speeds.array);

    switch (type as Speeds) {
      case "walk":
        s.speeds!.array!.push({
          string: `${speedNumber} ft`,
          number: speedNumber,
          type: "ft",
        });
        break;
      case "hover":
        s.speeds!.array.push(createPart("fly", "speed"));
        s.speeds!.array.push(createPart(" "));
        s.speeds!.array!.push({
          string: `${speedNumber} ft`,
          number: speedNumber,
          type: "ft",
        });
        s.speeds!.array.push(createPart(" ("));
        s.speeds!.array.push(createPart("hover", "speed"));
        s.speeds!.array.push(createPart(")"));
        break;
      default:
        s.speeds!.array.push(createPart(type, "speed"));
        s.speeds!.array.push(createPart(" "));
        s.speeds!.array!.push({
          string: `${speedNumber} ft`,
          number: speedNumber,
          type: "ft",
        });
        break;
    }
    speeds[type as Speeds] = speedNumber;
  }
  for (const speed in speeds) {
    if (
      !Object.hasOwn(speeds, speed) ||
      speeds[speed as Speeds] === undefined
    ) {
      continue;
    }
    v[speed.toUpperCase() as "FLY"] = speeds[speed as Speeds];
  }

  s.speeds.string = s.speeds.array.reduce((acc, obj) => acc + obj.string, "");

  if (!s.speeds.string) {
    delete s.speeds;
  }
}
