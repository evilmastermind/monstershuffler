import {} from "monstershuffler-shared";
import type { Size } from "../stats";
import { sizeStats } from "../stats";
import { parseExpressionNumeric } from "./expressions";
import {
  createPart,
  getBonus,
  getPrioritizedStatistic,
  numberToSignedString,
} from "./statistics";
import { numberToWord, addOrdinal } from "./numbers";
import type {
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
  Spells,
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
        const newWordFromTag = tags[newWord] || "";
        parts.push({
          string: newWordFromTag,
          type: "tag",
          // translationKey: newWord,
        });
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
        parts.push(...calculateAttack(attack, variant?.ability, character));
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

// ---------------------------------------------------------------------------
// VALUES PARSING
// ---------------------------------------------------------------------------

export function calculateValue(
  value: ValueDice | ValueExpression | ValueIncrProgression,
  character: Character,
  variant: ActionVariant | undefined = undefined
) {
  let parts: DescriptionPart[] = [];
  let totalValue = 0;
  const v = character.variables!;

  const part: DescriptionPart = {
    string: "",
    type: "text",
  };

  // when dice are present, I calculate the total value
  // and create the rollable dice part
  if (Object.hasOwn(value, "dice")) {
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

  // parsing the expression and adding it to the
  // rollable dice part, if any
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

  // this is used for multiattacks
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

  // adding the total value to the parts array
  if (Object.hasOwn(value, "dice")) {
    parts.unshift(createPart(" "));
    parts.unshift(createPart(totalValue.toString()));
    // adding the rollable dice part
    parts.push(part);
    parts.push(createPart(")"));
  } else if (variant?.type === "multiattack") {
    // adding the total value as word to the parts array
    const multiattackPart: DescriptionPart = {
      string: numberToWord(totalValue).trim(),
      number: totalValue,
      type: "numberAsWord",
    };
    parts.unshift(multiattackPart);
  } else {
    // adding the total value as number to the parts array
    parts.unshift(createPart(totalValue.toString()));
  }
  parts = addAdditionalDescriptionParts(parts, totalValue, value.type);
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
      parts = [
        {
          string: `DC ${value} Strength`,
          number: value,
          type: "translatableText",
          translationKey: "dcStrength",
          translationVariables: {
            dc: value.toString(),
          },
        },
      ];
      break;
    case "DC Dexterity":
      parts = [
        {
          string: `DC ${value} Dexterity`,
          number: value,
          type: "translatableText",
          translationKey: "dcDexterity",
          translationVariables: {
            dc: value.toString(),
          },
        },
      ];
      break;
    case "DC Constitution":
      parts = [
        {
          string: `DC ${value} Constitution`,
          number: value,
          type: "translatableText",
          translationKey: "dcConstitution",
          translationVariables: {
            dc: value.toString(),
          },
        },
      ];

      break;
    case "DC Intelligence":
      parts = [
        {
          string: `DC ${value} Intelligence`,
          number: value,
          type: "translatableText",
          translationKey: "dcIntelligence",
          translationVariables: {
            dc: value.toString(),
          },
        },
      ];
      break;
    case "DC Wisdom":
      parts = [
        {
          string: `DC ${value} Wisdom`,
          number: value,
          type: "translatableText",
          translationKey: "dcWisdom",
          translationVariables: {
            dc: value.toString(),
          },
        },
      ];
      break;
    case "DC Charisma":
      parts = [
        {
          string: `DC ${value} Strength`,
          number: value,
          type: "translatableText",
          translationKey: "dcStrength",
          translationVariables: {
            dc: value.toString(),
          },
        },
      ];
      break;
    case "DC Strength saving throw":
      parts = [
        {
          string: `DC ${value} Strength saving throw`,
          number: value,
          type: "translatableText",
          translationKey: "dcStrengthSave",
          translationVariables: {
            dc: value.toString(),
          },
        },
      ];
      break;
    case "DC Dexterity saving throw":
      parts = [
        {
          string: `DC ${value} Dexterity saving throw`,
          number: value,
          type: "translatableText",
          translationKey: "dcDexteritySave",
          translationVariables: {
            dc: value.toString(),
          },
        },
      ];
      break;
    case "DC Constitution saving throw":
      parts = [
        {
          string: `DC ${value} Constitution saving throw`,
          number: value,
          type: "translatableText",
          translationKey: "dcConstitutionSave",
          translationVariables: {
            dc: value.toString(),
          },
        },
      ];
      break;
    case "DC Intelligence saving throw":
      parts = [
        {
          string: `DC ${value} Intelligence saving throw`,
          number: value,
          type: "translatableText",
          translationKey: "dcIntelligenceSave",
          translationVariables: {
            dc: value.toString(),
          },
        },
      ];
      break;
    case "DC Wisdom saving throw":
      parts = [
        {
          string: `DC ${value} Wisdom saving throw`,
          number: value,
          type: "translatableText",
          translationKey: "dcWisdomSave",
          translationVariables: {
            dc: value.toString(),
          },
        },
      ];
      break;
    case "DC Charisma saving throw":
      parts = [
        {
          string: `DC ${value} Charisma saving throw`,
          number: value,
          type: "translatableText",
          translationKey: "dcCharismaSave",
          translationVariables: {
            dc: value.toString(),
          },
        },
      ];
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
      if (parts.length > 1) {
        parts.push(createPart(" "));
        parts.push(
          createPart(value === 1 ? "foot" : "feet", "translatableText")
        );
      } else {
        parts = [
          {
            string: `${value} feet`,
            number: value,
            type: "feet",
          },
        ];
      }
      break;
    case "-feet":
      if (parts.length > 1) {
        parts.push(createPart(" "));
        parts.push(createPart("-foot", "translatableText"));
      } else {
        parts = [
          {
            string: `${value}-foot`,
            number: value,
            type: "-feet",
          },
        ];
      }
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
  return parts;
}

// ---------------------------------------------------------------------------
// ATTACKS PARSING
// ---------------------------------------------------------------------------

export function calculateAttack(
  attack: Attack,
  variantAbility: ActionVariant["ability"],
  character: Character
) {
  const parts: DescriptionPart[] = [];
  const v = character.variables!;
  let ability = variantAbility;

  const attributes = attack?.attributes || {
    name: "Dagger",
    cost: "200",
    dice: "1",
    sides: "4",
    damageType: "piercing damage",
    weight: "1",
    range: "20",
    rangeMax: "60",
    properties: ["one-handed", "melee", "simple", "light", "finesse", "thrown"],
  };

  if ("choice" in attributes) {
    return parts;
  }

  // const isMelee = attributes.properties?.includes("melee");
  const isSpell = attributes.properties?.includes("spell");
  const isRanged = attributes.properties?.includes("ranged");
  const isThrown = attributes.properties?.includes("thrown");
  const isReach = attributes.properties?.includes("reach");
  const isVersatile = attributes.properties?.includes("versatile");
  const isSpecial = !!attributes?.special;

  let toHitBonus = 0;
  let damageBonus = 0;

  const attackTypePart: DescriptionPart = {
    string: "",
    type: "translatableText",
    format: ["italic"],
  };

  // attack type
  if (isRanged) {
    attackTypePart.string += "Ranged ";
    toHitBonus += getBonus(character, "rangedAttack");
    damageBonus += getBonus(character, "rangedDamage");
    ability ??= "DEX";
  } else {
    attackTypePart.string += "Melee ";
    toHitBonus += getBonus(character, "meleeAttack");
    damageBonus += getBonus(character, "meleeDamage");
    ability ??= "STR";
  }
  if (isSpell) {
    attackTypePart.string += "Spell Attack";
    toHitBonus += getBonus(character, "spellAttack");
    damageBonus += getBonus(character, "spellDamage");
    ability ??=
      getPrioritizedStatistic<Spells>(character, "spells")?.ability || "CHA";
  } else {
    attackTypePart.string += "Weapon Attack";
    toHitBonus += getBonus(character, "weaponAttack");
    damageBonus += getBonus(character, "weaponDamage");
  }

  parts.push(attackTypePart);
  parts.push(createPart(": "));

  // to hit bonus
  const toHit = v.PROF + v[ability] + toHitBonus;
  parts.push({
    string: `${numberToSignedString(toHit)} to hit`,
    number: toHit,
    type: "rollableNumberWithSign",
    translationKey: "toHit",
    translationVariables: {
      toHit: numberToSignedString(toHit),
    },
  });
  parts.push(createPart(", "));

  // ranged
  if (isRanged) {
    // range
    const range = parseExpressionNumeric(attributes.range || "20", character);
    const rangeMax = parseExpressionNumeric(
      attributes.rangeMax || "0",
      character
    );
    if (rangeMax && rangeMax > range) {
      parts.push({
        string: `range ${range}/${rangeMax} ft`,
        type: "range/rangeMax",
        translationKey: "range/rangeMax",
        translationVariables: {
          range: range.toString(),
          rangeMax: rangeMax.toString(),
        },
      });
    } else {
      parts.push({
        string: `range ${range} ft`,
        type: "range",
        translationKey: "range",
        translationVariables: {
          range: range.toString(),
        },
      });
    }
    parts.push(createPart(", "));
  } else {
    // reach
    const standardReachForSize = sizeStats[v.SIZE.toString() as Size].space;
    const weaponsReach = parseExpressionNumeric(
      attributes?.reach || standardReachForSize.toString(),
      character
    );
    // TODO: ========
    // if (isReach)
  }

  return parts;
}
