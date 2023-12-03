import { sensesList } from "../stats";
import {
  getBonus,
  getPrioritizedStatistic,
  getPrioritizedStatisticFromPath,
  parseExpressionNumeric,
  sortObject,
  pushWithComma,
  unshiftWithComma,
} from "@/parsers/functions";
import type { Character } from "@/types";

export function calculateSenses(character: Character) {
  const s = character.statistics!;
  const v = character.variables!;

  s.senses = {
    string: "",
    values: {},
  };

  for (const sense of sensesList) {
    const senseExpression = getPrioritizedStatisticFromPath<string>(
      character,
      `.senses.${sense}`
    );
    if (!senseExpression) {
      continue;
    }
    const senseBonus = getBonus(character, sense);
    const senseNumber =
      parseExpressionNumeric(senseExpression, character) + senseBonus;
    s.senses!.values[sense] = senseNumber + senseBonus;
  }

  s.senses!.values = sortObject(s.senses!.values);

  const passivePerceptionBonus = getBonus(character, "passivePerception");
  s.senses!.values["passive Perception"] =
    10 +
    (s.senses!.values?.Perception || s.abilityModifiers.WIS) +
    passivePerceptionBonus;

  const isBlind = getPrioritizedStatistic<boolean>(character, "isBlind");
  let alternativeSense = "";
  let mostPowerfulSense = 0;

  if (isBlind) {
    s.isBlind = true;
    alternativeSense = "just blind";
    if (Object.hasOwn(s.senses!.values, "blindsight")) {
      alternativeSense = "blindsight";
      mostPowerfulSense = s.senses!.values.blindsight;
    }
    if (Object.hasOwn(s.senses!.values, "tremorsense")) {
      if (s.senses!.values.tremorsense > mostPowerfulSense) {
        alternativeSense = "tremorsense";
        mostPowerfulSense = s.senses!.values.tremorsense;
      }
    }
  }

  for (const sense in s.senses!.values) {
    if (sense === "passive Perception") {
      s.senses!.string = pushWithComma(
        s.senses!.string,
        `${sense} ${s.senses!.values[sense]}`
      );
    } else {
      s.senses!.string = pushWithComma(
        s.senses!.string,
        `${sense} ${s.senses!.values[sense]} ft`
      );
      if (sense === alternativeSense) {
        s.senses!.string += " (blind beyond this radius)";
      }
    }
    v[`${sense.toUpperCase().replace(/\s/g, "")}` as "DARKVISION"] =
      s.senses!.values[sense];
  }

  if (alternativeSense === "just blind") {
    s.senses!.string = unshiftWithComma(s.senses!.string, "Blind");
  }

  if (!s.senses!.string) {
    delete s.senses;
  }
}
