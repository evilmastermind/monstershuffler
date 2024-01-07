import { start } from "repl";
import { parseExpressionNumeric } from "./expressions";
import { createPart } from "./statistics";
import { numberToWord, addOrdinal } from "./numbers";
import {
  ActionVariant,
  Attack,
  Character,
  DescriptionPart,
  ValueDice,
  ValueExpression,
  ValueIncrProgression,
  Variables,
  ParsedDice,
  ParsedExpression,
} from "@/types";

export function replaceTags(
  string: string,
  character: Character,
  variant: ActionVariant | undefined = undefined
) {
  const s = character.statistics!;
  const v = character.variables!;

  const parts: DescriptionPart[] = [];
  const tags = character.tags!;
  const stringSize = string.length;
  let position = 0;
  let j = 0;
  let startingPoint = 0;
  let word = "";
  let wordSize = 0;
  let newWord = "";
  const newWordSize = 0;

  while (position < stringSize) {
    const i = position;
    position++;
    // ---------------------------------------------------------
    // replacing tags between [ ] like [name]
    // ---------------------------------------------------------
    if (string.charAt(i) === "[") {
      parts.push(createPart(string.substring(startingPoint, i)));
      startingPoint = i;
      j = i + 1;
      while (string.charAt(j) !== "]" && j < stringSize) {
        j++;
      }
      if (j <= i + 1) {
        continue;
      }
      word = string.substring(i + 1, j);
      wordSize = word.length;
      newWord = word;
      // solving random choices
      if (newWord.includes("|")) {
        newWord = calculateRandomName(newWord);
      }
      if (Object.hasOwn(tags, newWord)) {
        // word found between [] is a tag
        newWord = tags[newWord] || "";
        parts.push(createPart(newWord, "tag"));
      } else if (newWord.substring(0, 6) === "spell:") {
        // TODO: spell preview
        parts.push(createPart(newWord.replace("spell:", "").trim(), "spell"));
      } else {
        // word found between [] is not recognizable
        parts.push(createPart(newWord));
      }
      position = position + (wordSize + 1);
      startingPoint = position;
    } else if (string.charAt(i) === "{") {
      // ---------------------------------------------------------
      // replacing variables between { } that contain expressions,
      // dice rolls and attacks
      // ---------------------------------------------------------
      parts.push(createPart(string.substring(startingPoint, i)));
      startingPoint = i;
      j = i + 1;
      while (string.charAt(j) !== "}" && j < stringSize) {
        j++;
      }
      if (j <= i + 1) {
        continue;
      }
      word = string.substring(i + 1, j);
      // TODO: firstPart is added here for the new syntax, ex: {attack 1d6 bludgeoning}
      const firstPart = word.split(" ")[0];
      wordSize = word.length;
      newWord = "";

      position = position + (wordSize + 1);
      startingPoint = position;

      const value = variant?.values?.find((v) => v.name === firstPart);
      if (value) {
        parts.push(...calculateValue(value, character, variant));
        continue;
      }
      const attack = variant?.attacks?.find((a) => a.name === firstPart);
      if (attack) {
        parts.push(...calculateAttack(attack, character));
        continue;
      }
      // here I should parse the new syntax
    }
  }

  if (startingPoint < stringSize) {
    parts.push(createPart(string.substring(startingPoint, stringSize)));
  }

  return parts;
}

// ---------------------------------------------------------------------------
// RANDOM TEXT MANAGEMENT
// ---------------------------------------------------------------------------

export function calculateRandomName(name = "") {
  if (!name) return "Name";
  const possibleNames = name.split("|") || null;
  if (possibleNames?.length <= 1) return name;

  const randomName = random(0, possibleNames.length - 1);
  return possibleNames[randomName];
}

export function calculateValue(
  value: ValueDice | ValueExpression | ValueIncrProgression,
  character: Character,
  variant: ActionVariant | undefined = undefined
) {
  const parts: DescriptionPart[] = [];
  let totalValue = 0;
  const v = character.variables!;

  const part: DescriptionPart = {
    string: "",
    type: "text",
  };

  if (Object.hasOwn(value, "dice")) {
    const valueDice = value as ValueDice;
    const dice = valueDice.dice;
    const currentUnitValue = dice.availableUnit === "level" ? v.LVL : v.CR;
    const availableUntil = dice.availableUntil || currentUnitValue;
    const unitEnd =
      currentUnitValue > availableUntil ? availableUntil : currentUnitValue;
    const unitStart = dice.availableAt || 1;
    const unitInterval = dice.unitInterval || 1;
    const diceIncrement = dice.diceIncrement || 1;

    const additionalDice =
      Math.floor((unitEnd - unitStart) / unitInterval) * diceIncrement || 0;
    const totalDice = dice.dice + additionalDice;
    totalValue += Math.floor((dice.sides / 2 + 0.5) * totalDice);
    const diceString = `${totalDice}d${dice.sides}`;
    if (parts.length === 0) {
      parts.push(createPart("("));
    }
    const parsedDice: ParsedDice = {
      dice: totalDice,
      sides: dice.sides,
    };
    if (value.type) {
      parsedDice.type = value.type;
    }
    part.dice = [parsedDice];
    part.type = "rollableDice";
    part.string += diceString;
  }

  if (Object.hasOwn(value, "expression")) {
    const valueExpression = value as ValueExpression;
    const expression = valueExpression.expression;
    const expressionResult = parseExpressionNumeric(expression, character);
    totalValue += expressionResult;
    if (part.string && expressionResult !== 0) {
      if (expressionResult > 0) {
        part.string += ` + ${expressionResult}`;
      } else {
        part.string += ` - ${expressionResult}`;
      }
      const parsedExpression: ParsedExpression = {
        value: expressionResult,
      };
      if (value.type) {
        parsedExpression.type = value.type;
      }
      part.dice = [...(part.dice || []), parsedExpression];
    }
  }

  if (Object.hasOwn(value, "incrProgression")) {
    const valueIncrProg = value as ValueIncrProgression;
    const incrProg = valueIncrProg.incrProgression;
    const currentUnitValue = incrProg.availableUnit === "level" ? v.LVL : v.CR;
    let result = incrProg.valueBase;
    let i = incrProg.availableAt || 1;
    let interval = incrProg.unitInterval || 1;
    while (i <= currentUnitValue) {
      result += incrProg.valueIncrement;
      i += interval;
      interval += incrProg.unitIncrement;
    }
    totalValue += result;
  }

  if (Object.hasOwn(value, "dice")) {
    parts.unshift(createPart(" "));
    parts.unshift(createPart(totalValue.toString()));
    parts.push(part);
    parts.push(createPart(")"));
  } else if (variant?.type === "multiattack") {
    const multiattackPart: DescriptionPart = {
      string: numberToWord(totalValue).trim(),
      number: totalValue,
      type: "numberAsWord",
    };
    parts.unshift(multiattackPart);
  } else {
    parts.unshift(createPart(totalValue.toString()));
  }
  addAdditionalDescriptionParts(parts, totalValue, value.type);
  return parts;
}

export function addAdditionalDescriptionParts(
  parts: DescriptionPart[],
  value = 0,
  type = ""
) {
  if (!type) {
    return parts;
  }
  switch (type) {
    case "attack":
      parts.push(createPart(" "));
      parts.push(
        createPart(value === 1 ? "attack" : "attacks", "translatableText")
      );
      break;
    case "creature":
      parts.push(createPart(" "));
      parts.push(
        createPart(value === 1 ? "creature" : "creatures", "translatableText")
      );
      break;
    case "humanoid":
      parts.push(createPart(" "));
      parts.push(
        createPart(value === 1 ? "humanoid" : "humanoids", "translatableText")
      );
      break;
    case "round":
      parts.push(createPart(" "));
      parts.push(
        createPart(value === 1 ? "round" : "rounds", "translatableText")
      );
      break;
    case "hour":
      parts.push(createPart(" "));
      parts.push(
        createPart(value === 1 ? "hour" : "hours", "translatableText")
      );
      break;
    case "minute":
      parts.push(createPart(" "));
      parts.push(
        createPart(value === 1 ? "minute" : "minutes", "translatableText")
      );
      break;
    case "day":
      parts.push(createPart(" "));
      parts.push(createPart(value === 1 ? "day" : "days", "translatableText"));
      break;
    case "DC Strength":
      parts.unshift(createPart(" "));
      parts.unshift(createPart("DC", "translatableText"));
      parts.unshift(createPart(" "));
      parts.push(createPart("Strength", "translatableText"));
      break;
    case "DC Dexterity":
      parts.unshift(createPart(" "));
      parts.unshift(createPart("DC", "translatableText"));
      parts.unshift(createPart(" "));
      parts.push(createPart("Dexterity", "translatableText"));
      break;
    case "DC Constitution":
      parts.unshift(createPart(" "));
      parts.unshift(createPart("DC", "translatableText"));
      parts.unshift(createPart(" "));
      parts.push(createPart("Constitution", "translatableText"));
      break;
    case "DC Intelligence":
      parts.unshift(createPart(" "));
      parts.unshift(createPart("DC", "translatableText"));
      parts.unshift(createPart(" "));
      parts.push(createPart("Intelligence", "translatableText"));
      break;
    case "DC Wisdom":
      parts.unshift(createPart(" "));
      parts.unshift(createPart("DC", "translatableText"));
      parts.unshift(createPart(" "));
      parts.push(createPart("Wisdom", "translatableText"));
      break;
    case "DC Charisma":
      parts.unshift(createPart(" "));
      parts.unshift(createPart("DC", "translatableText"));
      parts.unshift(createPart(" "));
      parts.push(createPart("Charisma", "translatableText"));
      break;
    case "hit point":
      parts.push(createPart(" "));
      parts.push(
        createPart(value === 1 ? "hit point" : "hit points", "translatableText")
      );
      break;
    case "temporary hit point":
      parts.push(createPart(" "));
      parts.push(
        createPart(
          value === 1 ? "temporary hit point" : "temporary hit points",
          "translatableText"
        )
      );
      break;
    case "+":
      if (value >= 0) {
        parts.unshift(createPart("+"));
      } else {
        parts.unshift(createPart("-"));
      }
      break;
    case "-st-nd-rd":
      parts.push({
        string: addOrdinal(value),
        number: value,
        type: "ordinal",
      });
      break;
    case "feet":
      parts.push(createPart(" "));
      parts.push(createPart(value === 1 ? "foot" : "feet", "translatableText"));
      break;
    case "-feet":
      parts.push(
        createPart(value === 1 ? "-foot" : "-feet", "translatableText")
      );
      break;
    case "time":
      parts.push(createPart(" "));
      parts.push(
        createPart(value === 1 ? "time" : "times", "translatableText")
      );
      break;
    case "acid damage":
      parts.push(createPart(" "));
      parts.push(createPart("acid", "damageType"));
      parts.push(createPart(" "));
      parts.push(createPart("damage", "translatableText"));
      break;
    case "bludgeoning damage":
      parts.push(createPart(" "));
      parts.push(createPart("bludgeoning", "damageType"));
      parts.push(createPart(" "));
      parts.push(createPart("damage", "translatableText"));
      break;
    case "cold damage":
      parts.push(createPart(" "));
      parts.push(createPart("cold", "damageType"));
      parts.push(createPart(" "));
      parts.push(createPart("damage", "translatableText"));
      break;
    case "fire damage":
      parts.push(createPart(" "));
      parts.push(createPart("fire", "damageType"));
      parts.push(createPart(" "));
      parts.push(createPart("damage", "translatableText"));
      break;
    case "force damage":
      parts.push(createPart(" "));
      parts.push(createPart("force", "damageType"));
      parts.push(createPart(" "));
      parts.push(createPart("damage", "translatableText"));
      break;
    case "lightning damage":
      parts.push(createPart(" "));
      parts.push(createPart("lightning", "damageType"));
      parts.push(createPart(" "));
      parts.push(createPart("damage", "translatableText"));
      break;
    case "necrotic damage":
      parts.push(createPart(" "));
      parts.push(createPart("necrotic", "damageType"));
      parts.push(createPart(" "));
      parts.push(createPart("damage", "translatableText"));
      break;
    case "piercing damage":
      parts.push(createPart(" "));
      parts.push(createPart("piercing", "damageType"));
      parts.push(createPart(" "));
      parts.push(createPart("damage", "translatableText"));
      break;
    case "poison damage":
      parts.push(createPart(" "));
      parts.push(createPart("poison", "damageType"));
      parts.push(createPart(" "));
      parts.push(createPart("damage", "translatableText"));
      break;
    case "psychic damage":
      parts.push(createPart(" "));
      parts.push(createPart("psychic", "damageType"));
      parts.push(createPart(" "));
      parts.push(createPart("damage", "translatableText"));
      break;
      break;
    case "radiant damage":
      parts.push(createPart(" "));
      parts.push(createPart("radiant", "damageType"));
      parts.push(createPart(" "));
      parts.push(createPart("damage", "translatableText"));
      break;
    case "slashing damage":
      parts.push(createPart(" "));
      parts.push(createPart("slashing", "damageType"));
      parts.push(createPart(" "));
      parts.push(createPart("damage", "translatableText"));
      break;
    case "thunder damage":
      parts.push(createPart(" "));
      parts.push(createPart("thunder", "damageType"));
      parts.push(createPart(" "));
      parts.push(createPart("damage", "translatableText"));
      break;
  }
}

export function calculateAttack(attack: Attack, character: Character) {
  return [];
}
// /// //////////////////////////////////
// // finding the variable in "values"
// let variableInfo = JSPath.apply(
//   '.values..{.name=="' + word + '"}',
//   object
// );
// if (variableInfo.length != 0) {
//   variableInfo = variableInfo[0];

//   const newString = {
//     totalValue: 0,
//     textValue: "",
//   };
//   // resolving dice
//   if (find(variableInfo, "dice"))
//     resolveDice(variableInfo.dice, newString, variables);
//   // resolving expression
//   if (find(variableInfo, "expression"))
//     resolveExpression(variableInfo.expression, newString, variables);
//   // resolving incremental progression
//   if (find(variableInfo, "incrProgression"))
//     resolveIncrProgression(
//       variableInfo.incrProgression,
//       newString,
//       variables
//     );

//   if (newString.textValue.length > 0) {
//     // merging value and text only if dices were found
//     if (find(variableInfo, "dice"))
//       newWord = newString.totalValue + " " + newString.textValue + ")";
//     else {
//       newWord = newString.totalValue.toString();
//       if (find(object, "type") === "multiattack") {
//         newWord = toWords(newWord);
//       }
//     }
//     newWord = addType(
//       newWord,
//       newString.totalValue,
//       find(variableInfo, "type")
//     );
//   }
// } else {
//   variableInfo = JSPath.apply(
//     '.attacks..{.name=="' + word + '"}',
//     object
//   );
//   if (variableInfo.length != 0) {
//     // resolving attack
//     let lowerDice = false;
//     if (find(object, "tag") == "profession") {
//       if (
//         find(object, "name") != find(variableInfo[0].attributes, "name")
//       )
//         lowerDice = true;
//     }
//     newWord = resolveAttack(
//       character,
//       variableInfo,
//       find(object, "ability"),
//       variables,
//       lowerDice
//     );
//   }
// }
