import { parseExpressionNumeric } from "./expressions";
import { numberToWord, addOrdinal } from "./numbers";
import type {
  ActionVariant,
  Character,
  DescriptionPart,
  ValueDice,
  ValueExpression,
  ValueIncrProgression,
  Enchantment,
  ParsedDice,
} from "@/types";

export function calculateValue(
  value: ValueDice | ValueExpression | ValueIncrProgression | Enchantment,
  character: Character,
  variant: ActionVariant | undefined = undefined,
  isEnchantment = false
) {
  let average = 0;
  const v = character.variables!;

  const part: DescriptionPart = {
    string: "",
    type: "value",
    translationVariables: {},
  };

  const finalParsedDice: ParsedDice[] = [];

  /**
   * ==================================================
   * 1. calculate the total value
   * ==================================================
   */

  // when dice are present, I calculate the total value
  // and create the rollable dice part
  if ("dice" in value) {
    part.type = "diceRoll";
    const valueDice = value as ValueDice;
    const dice = valueDice.dice;
    const currentUnitValue = dice.availableUnit === "level" ? v.LVL : v.CR;
    const availableUntil = dice.availableUntil || currentUnitValue;
    const unitEnd =
      currentUnitValue > availableUntil ? availableUntil : currentUnitValue;
    const unitStart = dice.availableAt || 1;
    const unitInterval = dice.unitInterval || 1;
    const diceIncrement = dice.diceIncrement || 0;

    const additionalDice =
      Math.floor((unitEnd - unitStart) / unitInterval) * diceIncrement || 0;
    const totalDice = dice.dice + additionalDice;
    average += Math.floor((dice.sides / 2 + 0.5) * totalDice);
    const diceString = `${totalDice}d${dice.sides}`;
    part.string = `(${diceString}`;

    // creating the parsed dice object
    // which is used to roll the dice in the frontend
    const parsedDice: ParsedDice = {
      dice: totalDice,
      sides: dice.sides,
      value: average,
      string: "",
    };
    if (value.type) {
      parsedDice.type = value.type;
    }
    finalParsedDice.push(parsedDice);
  }

  // parsing the expression
  if ("expression" in value && value.expression) {
    const valueExpression = value as ValueExpression;
    const expression = valueExpression.expression;
    const expressionResult = parseExpressionNumeric(expression, character);
    average += expressionResult;
    if (part.string && expressionResult !== 0) {
      if (expressionResult > 0) {
        part.string += ` + ${expressionResult})`;
      } else {
        part.string += ` - ${expressionResult})`;
      }
      // adding the expression as bonus to the dice roll
      if (finalParsedDice.length > 0) {
        finalParsedDice[0].bonus = expressionResult;
      }
    } else {
      part.string += `${expressionResult}`;
      part.number = expressionResult;
      if (isEnchantment) {
        part.roll = {
          dice: [
            {
              value: expressionResult,
              type: value.type,
            },
          ],
        };
      }
    }
  } else if (part.string) {
    part.string += ")";
  }

  // this is used for multiattacks
  if ("incrProgression" in value) {
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
    average += result;
  }

  /**
   * ==================================================
   * 2. completing the final string
   * ==================================================
   */

  // adding the total value to the parts array
  if ("dice" in value) {
    part.string = `${average} ${part.string}`; // 10 (2d6 + 3)
    if (finalParsedDice.length > 0) {
      finalParsedDice[0].string = part.string;
      finalParsedDice[0].value = average;
      part.roll = {
        dice: finalParsedDice,
        name: variant?.name || value.name || "Dice Roll",
        // translationKey is not required here: the name is going to be the
        // action's name, which can't be translated
      };
    }
  } else if (variant?.type === "multiattack") {
    // adding the total value as word to the parts array
    part.string = numberToWord(average);
    part.type = "valueAsWord";
    part.translationVariables!.n = average.toString();
  } else {
    part.type = "value";
    part.translationVariables!.n = average.toString();
  }
  addAdditionalDescriptionParts(part, value.type, average);
  return part;
}

export function addAdditionalDescriptionParts(
  part: DescriptionPart,
  type = "",
  average = 0
) {
  if (!type) {
    return;
  }
  switch (type) {
    case "target":
      part.string += average === 1 ? " target" : " targets";
      part.translationKey = `value.${type}`;
      break;
    case "attack":
      part.string += average === 1 ? " attack" : " attacks";
      part.translationKey = `value.${type}`;
      break;
    case "creature":
      part.string += average === 1 ? " creature" : " creatures";
      part.translationKey = `value.${type}`;
      break;
    case "humanoid":
      part.string += average === 1 ? " humanoid" : " humanoids";
      part.translationKey = `value.${type}`;
      break;
    case "round":
      part.string += average === 1 ? " round" : " rounds";
      part.translationKey = `value.${type}`;
      break;
    case "minute":
      part.string += average === 1 ? " minute" : " minutes";
      part.translationKey = `value.${type}`;
      break;
    case "hour":
      part.string += average === 1 ? " hour" : " hours";
      part.translationKey = `value.${type}`;
      break;
    case "day":
      part.string += average === 1 ? " day" : " days";
      part.translationKey = `value.${type}`;
      break;
    case "DC Strength":
      part.string = `DC ${part.string} Strength`;
      part.translationKey = `value.${type}`;
      break;
    case "DC Dexterity":
      part.string = `DC ${part.string} Dexterity`;
      part.translationKey = `value.${type}`;
      break;
    case "DC Constitution":
      part.string = `DC ${part.string} Constitution`;
      part.translationKey = `value.${type}`;
      break;
    case "DC Intelligence":
      part.string = `DC ${part.string} Intelligence`;
      part.translationKey = `value.${type}`;
      break;
    case "DC Wisdom":
      part.string = `DC ${part.string} Wisdom`;
      part.translationKey = `value.${type}`;
      break;
    case "DC Charisma":
      part.string = `DC ${part.string} Charisma`;
      part.translationKey = `value.${type}`;
      break;
    case "DC Strength saving throw":
      part.string = `DC ${part.string} Charisma saving throw`;
      part.translationKey = `value.${type}`;
      break;
    case "DC Constitution saving throw":
      part.string = `DC ${part.string} Constitution saving throw`;
      part.translationKey = `value.${type}`;
      break;
    case "DC Dexterity saving throw":
      part.string = `DC ${part.string} Dexterity saving throw`;
      part.translationKey = `value.${type}`;
      break;
    case "DC Intelligence saving throw":
      part.string = `DC ${part.string} Intelligence saving throw`;
      part.translationKey = `value.${type}`;
      break;
    case "DC Wisdom saving throw":
      part.string = `DC ${part.string} Wisdom saving throw`;
      part.translationKey = `value.${type}`;
      break;
    case "DC Charisma saving throw":
      part.string = `DC ${part.string} Charisma saving throw`;
      part.translationKey = `value.${type}`;
      break;
    case "hit point":
      part.string += average === 1 ? " hit point" : " hit points";
      part.translationKey = `value.${type}`;
      break;
    case "temporary hit point":
      part.string +=
        average === 1 ? " temporary hit point" : " temporary hit points";
      part.translationKey = `value.${type}`;
      break;
    case "+":
      if (average >= 0) {
        part.string = `+${part.string}`;
        part.translationKey = `value.+`;
      } else {
        part.string = `${part.string}`;
        part.translationKey = `value.-`;
      }
      break;
    case "-st-nd-rd":
      part.string += addOrdinal(average);
      part.number = average;
      part.type = "ordinal";
      break;
    case "feet":
      part.string += average === 1 ? " foot" : " feet";
      part.number = average;
      part.type = "feet";
      break;
    case "-feet":
      part.string += "-feet";
      part.number = average;
      part.type = "-feet";
      break;
    case "time":
      part.string += average === 1 ? " time" : " times";
      part.translationKey = `value.${type}`;
      break;
    case "damage":
      part.string += " damage";
      part.translationKey = `value.${type}`;
      break;
    case "acid damage":
      part.string += " acid damage";
      part.translationKey = `value.${type}`;
      break;
    case "bludgeoning damage":
      part.string += " bludgeoning damage";
      part.translationKey = `value.${type}`;
      break;
    case "cold damage":
      part.string += " cold damage";
      part.translationKey = `value.${type}`;
      break;
    case "fire damage":
      part.string += " fire damage";
      part.translationKey = `value.${type}`;
      break;
    case "force damage":
      part.string += " force damage";
      part.translationKey = `value.${type}`;
      break;
    case "lightning damage":
      part.string += " lightning damage";
      part.translationKey = `value.${type}`;
      break;
    case "necrotic damage":
      part.string += " necrotic damage";
      part.translationKey = `value.${type}`;
      break;
    case "piercing damage":
      part.string += " piercing damage";
      part.translationKey = `value.${type}`;
      break;
    case "poison damage":
      part.string += " poison damage";
      part.translationKey = `value.${type}`;
      break;
    case "psychic damage":
      part.string += " psychic damage";
      part.translationKey = `value.${type}`;
      break;
    case "radiant damage":
      part.string += " radiant damage";
      part.translationKey = `value.${type}`;
      break;
    case "slashing damage":
      part.string += " slashing damage";
      part.translationKey = `value.${type}`;
      break;
    case "thunder damage":
      part.string += " thunder damage";
      part.translationKey = `value.${type}`;
      break;
    default:
      part.translationKey = `value.value`;
  }
}
