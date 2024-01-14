import { sensesList } from "../stats";
import {
  getBonus,
  getPrioritizedStatistic,
  getPrioritizedStatisticFromPath,
  parseExpressionNumeric,
  sortObject,
  addCommaIfNotEmpty,
  createPart,
} from "@/parsers/functions";
import type { Character } from "@/types";

export function calculateSenses(character: Character) {
  const s = character.statistics!;
  const v = character.variables!;

  s.senses = {
    string: "",
    array: [],
  };

  type Senses = (typeof sensesList)[number];

  let senses: { [key in Senses]?: number } = {};

  for (const sense of sensesList) {
    const senseExpression = getPrioritizedStatisticFromPath<string>(
      character,
      `.senses.'${sense}'`
    );
    if (!senseExpression) {
      continue;
    }
    const senseBonus = getBonus(character, sense);
    const senseNumber =
      parseExpressionNumeric(senseExpression, character) + senseBonus;
    senses[sense] = senseNumber;
  }

  senses = sortObject(senses);

  const passivePerceptionBonus = getBonus(character, "passivePerception");
  senses["passive Perception"] =
    10 + (v?.PERCEPTION || v.WIS) + passivePerceptionBonus;

  const isBlind = getPrioritizedStatistic<boolean>(character, "isBlind");
  let alternativeSense = "";
  let mostPowerfulSense = 0;

  if (isBlind) {
    s.isBlind = true;
    alternativeSense = "just blind";
    if (
      Object.hasOwn(senses, "blindsight") &&
      senses.blindsight !== undefined
    ) {
      alternativeSense = "blindsight";
      mostPowerfulSense = senses.blindsight;
    }
    if (
      Object.hasOwn(senses, "tremorsense") &&
      senses.tremorsense !== undefined
    ) {
      if (senses.tremorsense > mostPowerfulSense) {
        alternativeSense = "tremorsense";
        mostPowerfulSense = senses.tremorsense;
      }
    }
  }

  for (const key in senses) {
    if (!Object.hasOwn(senses, key)) {
      continue;
    }
    if (senses[key as Senses] === undefined) {
      continue;
    }
    const sense = key as Senses;
    addCommaIfNotEmpty(s.senses!.array);
    if (sense === "passive Perception") {
      s.senses!.array.push(createPart("passive Perception", "sense"));
      s.senses!.array.push(createPart(" "));
      s.senses!.array.push(createPart(senses[sense]!.toString()));
    } else {
      s.senses!.array.push(createPart(capitalizeFirst(sense), "sense"));
      s.senses!.array.push(createPart(" "));
      s.senses!.array.push({
        string: `${senses[sense]} ft`,
        number: senses[sense],
        type: "ft",
      });
      if (sense === alternativeSense) {
        s.senses!.array.push(createPart(" ("));
        s.senses!.array.push(
          createPart("blind beyond this radius", "translatableText")
        );
        s.senses!.array.push(createPart(")"));
      }
    }
  }

  sensesList.forEach((sense) => {
    v[`${sense.toUpperCase().replace(/\s/g, "")}` as "DARKVISION"] =
      senses[sense] ?? 0;
  });

  if (alternativeSense === "just blind") {
    s.senses!.array.unshift(createPart(", "));
    s.senses!.array.unshift(createPart("Blind", "translatableText"));
  }

  s.senses!.string = s.senses!.array.reduce((acc, obj) => acc + obj.string, "");
}
