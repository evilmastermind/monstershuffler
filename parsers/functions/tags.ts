import type { Size } from "../stats";
import { sizeStats } from "../stats";
import { parseExpressionNumeric } from "./expressions";
import {
  createPart,
  getBonus,
  getPrioritizedStatistic,
  numberToSignedString,
} from "./statistics";
import { numberToWord, addOrdinal, roundDiceSides } from "./numbers";
import type {
  ActionVariant,
  Attack,
  Character,
  DescriptionPart,
  ValueDice,
  ValueExpression,
  ValueIncrProgression,
  ParsedDice,
  ParsedExpression,
  Spells,
} from "@/types";
import { toggle } from "@/utils";

export function replaceTags(
  untrimmedString: string,
  character: Character,
  variant: ActionVariant | undefined = undefined
) {
  const string = untrimmedString.trim().replace(/^\\n|\\n$/g, "");
  const parts: DescriptionPart[] = [];
  const tags = character.tags!;
  const format: DescriptionPart["format"] = [];
  let isListStarted = false;
  let isListItemStarted = false;
  const stringSize = string.length;
  let position = 0;
  let j = 0;
  let startingPoint = 0;
  let word = "";
  let wordSize = 0;
  let newWord = "";

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
        parts.push(
          createPart(newWord.replace("spell:", "").trim(), "spell", [
            "italic",
            "underline",
          ])
        );
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
        parts.push(calculateValue(value, character, variant));
        continue;
      }
      const attack = variant?.attacks?.find((a) => a.name === firstPart);
      if (attack) {
        parts.push(...calculateAttack(attack, variant!, character));
        continue;
      }
      // here I should parse the new syntax

      // ---------------------------------------------------------
      // pseudo-markdown for actions
      // ---------------------------------------------------------
    } else if (string.charAt(i) === "\n") {
      parts.push(createPart(string.substring(startingPoint, i)));
      parts.push(createPart("\n"));
      if (isListItemStarted) {
        // list item end
        parts.push(createPart("", "listItemEnd", format));
        isListItemStarted = false;
      }
      if (string.charAt(i + 1) === "-") {
        if (!isListStarted) {
          // list start
          parts.push(createPart(``, "listStart", format));
          isListStarted = true;
        }
        // list item start
        parts.push(createPart(`-`, "listItemStart", format));
        isListItemStarted = true;
        position++;
      } else if (string.charAt(i + 1) === "\n") {
        // paragraph end (double new line)
        parts.push(createPart(`\n`, "paragraphEnd", format));
        position++;
      } else {
        if (isListStarted) {
          // list end
          parts.push(createPart(``, "listEnd", format));
          isListStarted = false;
        }
        // next line
        parts.push(createPart(`\n`, "nextLine", format));
      }
      startingPoint = position;
    } else if (string.charAt(i) === "*") {
      parts.push(createPart(string.substring(startingPoint, i)));
      if (string.charAt(i + 1) === "*") {
        // bold
        toggle(format, "font-bold");
        position++;
      } else {
        // italic
        toggle(format, "italic");
      }
      startingPoint = position;
    } else if (string.charAt(i) === "_") {
      parts.push(createPart(string.substring(startingPoint, i)));
      // italic
      toggle(format, "italic");
      startingPoint = position;
    }
  }

  if (startingPoint < stringSize) {
    parts.push(createPart(string.substring(startingPoint, stringSize)));
  }

  if (isListItemStarted) {
    parts.push(createPart("", "listItemEnd", format));
  }
  if (isListStarted) {
    // list end
    parts.push(createPart(``, "listEnd", format));
    isListStarted = false;
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
  let totalValue = 0;
  const v = character.variables!;

  const part: DescriptionPart = {
    string: "",
    type: "value",
    translationVariables: {},
  };

  // when dice are present, I calculate the total value
  // and create the rollable dice part
  if (Object.hasOwn(value, "dice")) {
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
    totalValue += Math.floor((dice.sides / 2 + 0.5) * totalDice);
    const diceString = `${totalDice}d${dice.sides}`;
    part.string = `(${diceString}`;

    const parsedDice: ParsedDice = {
      dice: totalDice,
      sides: dice.sides,
    };
    part.roll = {
      dice: [],
      name: variant?.name || value?.name || "Dice Roll",
    };
    if (value.type) {
      parsedDice.type = value.type;
    }
    part.roll!.dice = [parsedDice];
    part.translationKey = "rollableDice";
  }

  // parsing the expression and adding it to the
  // rollable dice part, if any
  if ("expression" in value && value.expression) {
    const valueExpression = value as ValueExpression;
    const expression = valueExpression.expression;
    const expressionResult = parseExpressionNumeric(expression, character);
    totalValue += expressionResult;
    if (part.string && expressionResult !== 0) {
      if (expressionResult > 0) {
        part.string += ` + ${expressionResult})`;
      } else {
        part.string += ` - ${expressionResult})`;
      }
      const parsedExpression: ParsedExpression = {
        value: expressionResult,
      };
      if (value.type) {
        parsedExpression.type = value.type;
      }
      part.roll!.dice = [...(part.roll!.dice || []), parsedExpression];
    } else {
      part.string += `${expressionResult}`;
    }
  } else if (part.string) {
    part.string += ")";
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
    part.string = `${totalValue} ${part.string}`;
    part.translationVariables!.value = part.string;
  } else if (variant?.type === "multiattack") {
    // adding the total value as word to the parts array
    part.string = numberToWord(totalValue);
    part.type = "valueAsWord";
    part.translationVariables!.n = totalValue.toString();
  } else {
    part.type = "value";
    part.translationVariables!.n = totalValue.toString();
  }
  addAdditionalDescriptionParts(part, value.type, totalValue);
  return part;
}

export function addAdditionalDescriptionParts(
  part: DescriptionPart,
  type = "",
  totalValue = 0
) {
  if (!type) {
    return;
  }
  switch (type) {
    case "attack":
      part.string += totalValue === 1 ? " attack" : " attacks";
      part.translationKey = "valueAttack";
      break;
    case "creature":
      part.string += totalValue === 1 ? " creature" : " creatures";
      part.translationKey = "valueCreature";
      break;
    case "humanoid":
      part.string += totalValue === 1 ? " humanoid" : " humanoids";
      part.translationKey = "valueHumanoid";
      break;
    case "round":
      part.string += totalValue === 1 ? " round" : " rounds";
      part.translationKey = "valueRound";
      break;
    case "hour":
      part.string += totalValue === 1 ? " hour" : " hours";
      part.translationKey = "valueHour";
      break;
    case "minute":
      part.string += totalValue === 1 ? " minute" : " minutes";
      part.translationKey = "valueMinute";
      break;
    case "day":
      part.string += totalValue === 1 ? " day" : " days";
      part.translationKey = "valueDay";
      break;
    case "DC Strength":
      part.string = `DC ${part.string} Strength`;
      part.translationKey = "dcStrength";
      break;
    case "DC Dexterity":
      part.string = `DC ${part.string} Dexterity`;
      part.translationKey = "dcDexterity";
      break;
    case "DC Constitution":
      part.string = `DC ${part.string} Constitution`;
      part.translationKey = "dcConstitution";
      break;
    case "DC Intelligence":
      part.string = `DC ${part.string} Intelligence`;
      part.translationKey = "dcIntelligence";
      break;
    case "DC Wisdom":
      part.string = `DC ${part.string} Wisdom`;
      part.translationKey = "dcWisdom";
      break;
    case "DC Charisma":
      part.string = `DC ${part.string} Charisma`;
      part.translationKey = "dcCharisma";
      break;
    case "DC Strength saving throw":
      part.string = `DC ${part.string} Charisma saving throw`;
      part.translationKey = "dcStrengthSave";
      break;
    case "DC Constitution saving throw":
      part.string = `DC ${part.string} Constitution saving throw`;
      part.translationKey = "dcConstitutionSave";
      break;
    case "DC Dexterity saving throw":
      part.string = `DC ${part.string} Dexterity saving throw`;
      part.translationKey = "dcDexteritySave";
      break;
    case "DC Intelligence saving throw":
      part.string = `DC ${part.string} Intelligence saving throw`;
      part.translationKey = "dcIntelligenceSave";
      break;
    case "DC Wisdom saving throw":
      part.string = `DC ${part.string} Wisdom saving throw`;
      part.translationKey = "dcWisdomSave";
      break;
    case "DC Charisma saving throw":
      part.string = `DC ${part.string} Charisma saving throw`;
      part.translationKey = "dcCharismaSave";
      break;
    case "hit point":
      part.string += totalValue === 1 ? " hit point" : " hit points";
      if (part.translationKey === "rollableDice") {
        part.translationKey = "rollableHitPoint";
      } else {
        part.translationKey = "valueHitPoint";
      }
      break;
    case "temporary hit point":
      part.string +=
        totalValue === 1 ? " temporary hit point" : " temporary hit points";
      if (part.translationKey === "rollableDice") {
        part.translationKey = "rollableTemporaryHitPoint";
      } else {
        part.translationKey = "valueTemporaryHitPoint";
      }
      break;
    case "+":
      if (totalValue >= 0) {
        part.string = `+${part.string}`;
        part.translationKey = "valuePlus";
      } else {
        part.string = `${part.string}`;
        part.translationKey = "valueMinus";
      }
      break;
    case "-st-nd-rd":
      part.string += addOrdinal(totalValue);
      part.number = totalValue;
      part.type = "ordinal";
      break;
    case "feet":
      part.string += totalValue === 1 ? " foot" : " feet";
      part.number = totalValue;
      part.type = "feet";
      break;
    case "-feet":
      part.string += "-feet";
      part.number = totalValue;
      part.type = "-feet";
      break;
    case "time":
      part.string += totalValue === 1 ? " time" : " times";
      part.translationKey = "valueTime";
      break;
    case "acid damage":
      part.string += " acid damage";
      part.translationKey =
        part.translationKey === "rollableDice"
          ? "rollableDamage"
          : "valueDamage";
      part.translationVariables!.damageType = "acid";
      break;
    case "bludgeoning damage":
      part.string += " bludgeoning damage";
      part.translationKey =
        part.translationKey === "rollableDice"
          ? "rollableDamage"
          : "valueDamage";
      part.translationVariables!.damageType = "bludgeoning";
      break;
    case "cold damage":
      part.string += " cold damage";
      part.translationKey =
        part.translationKey === "rollableDice"
          ? "rollableDamage"
          : "valueDamage";
      part.translationVariables!.damageType = "cold";
      break;
    case "fire damage":
      part.string += " fire damage";
      part.translationKey =
        part.translationKey === "rollableDice"
          ? "rollableDamage"
          : "valueDamage";
      part.translationVariables!.damageType = "fire";
      break;
    case "force damage":
      part.string += " force damage";
      part.translationKey =
        part.translationKey === "rollableDice"
          ? "rollableDamage"
          : "valueDamage";
      part.translationVariables!.damageType = "force";
      break;
    case "lightning damage":
      part.string += " lightning damage";
      part.translationKey =
        part.translationKey === "rollableDice"
          ? "rollableDamage"
          : "valueDamage";
      part.translationVariables!.damageType = "lightning";
      break;
    case "necrotic damage":
      part.string += " necrotic damage";
      part.translationKey =
        part.translationKey === "rollableDice"
          ? "rollableDamage"
          : "valueDamage";
      part.translationVariables!.damageType = "necrotic";
      break;
    case "piercing damage":
      part.string += " piercing damage";
      part.translationKey =
        part.translationKey === "rollableDice"
          ? "rollableDamage"
          : "valueDamage";
      part.translationVariables!.damageType = "piercing";
      break;
    case "poison damage":
      part.string += " poison damage";
      part.translationKey =
        part.translationKey === "rollableDice"
          ? "rollableDamage"
          : "valueDamage";
      part.translationVariables!.damageType = "poison";
      break;
    case "psychic damage":
      part.string += " psychic damage";
      part.translationKey =
        part.translationKey === "rollableDice"
          ? "rollableDamage"
          : "valueDamage";
      part.translationVariables!.damageType = "psychic";
      break;
    case "radiant damage":
      part.string += "radiant damage";
      part.translationKey =
        part.translationKey === "rollableDice"
          ? "rollableDamage"
          : "valueDamage";
      part.translationVariables!.damageType = "radiant";
      break;
    case "slashing damage":
      part.string += " slashing damage";
      part.translationKey =
        part.translationKey === "rollableDice"
          ? "rollableDamage"
          : "valueDamage";
      part.translationVariables!.damageType = "slashing";
      break;
    case "thunder damage":
      part.string += " thunder damage";
      part.translationKey =
        part.translationKey === "rollableDice"
          ? "rollableDamage"
          : "valueDamage";
      part.translationVariables!.damageType = "thunder";
      break;
  }
}

// ---------------------------------------------------------------------------
// ATTACKS PARSING
// ---------------------------------------------------------------------------

export function calculateAttack(
  attack: Attack,
  variant: ActionVariant,
  character: Character
) {
  const parts: DescriptionPart[] = [];
  const v = character.variables!;
  let ability = variant?.ability || "STR";

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
    if (isThrown) {
      attackTypePart.string += "or Ranged ";
    }
    toHitBonus += getBonus(character, "meleeAttack");
    damageBonus += getBonus(character, "meleeDamage");
    ability ??= "STR";
  }
  if (isSpell) {
    attackTypePart.string += "Spell Attack:";
    toHitBonus += getBonus(character, "spellAttack");
    damageBonus += getBonus(character, "spellDamage");
    ability ??=
      getPrioritizedStatistic<Spells>(character, "spells")?.ability || "CHA";
  } else {
    attackTypePart.string += "Weapon Attack:";
    toHitBonus += getBonus(character, "weaponAttack");
    damageBonus += getBonus(character, "weaponDamage");
  }

  parts.push(attackTypePart);
  parts.push(createPart(" "));

  // to hit bonus
  const toHit = v.PROF + v[ability] + toHitBonus;
  parts.push({
    string: `${numberToSignedString(toHit)} to hit`,
    number: toHit,
    type: "d20Roll",
    roll: {
      name: variant.name || attributes.name || "Attack",
    },
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
    let totalReach: number;
    if (isReach) {
      totalReach = standardReachForSize + weaponsReach;
    } else {
      totalReach = weaponsReach;
    }
    parts.push({
      string: `reach ${totalReach} ft`,
      type: "reach",
      translationKey: "reach",
      translationVariables: {
        reach: weaponsReach.toString(),
      },
    });

    // thrown
    if (isThrown) {
      parts.push(createPart(" "));
      parts.push(createPart("or", "translatableText"));
      parts.push(createPart(" "));
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
    }
    parts.push(createPart(", "));
  }

  // targets
  const targets = parseExpressionNumeric(attributes.targets || "1", character);
  parts.push({
    string: `${numberToWord(targets)} ${targets === 1 ? "target" : "targets"}`,
    type: "valueAsWord",
    translationKey: "valueTarget",
    translationVariables: { n: targets.toString() },
  });
  parts.push(createPart(". "));

  // damage
  parts.push(createPart("Hit:", "translatableText", ["italic"]));
  parts.push(createPart(" "));
  const part: DescriptionPart = {
    string: "",
    type: "diceRoll",
    translationVariables: {},
  };

  if ("dice" in attributes) {
    const dice = parseExpressionNumeric(attributes.dice || "1", character);
    const sides = roundDiceSides(
      parseExpressionNumeric(attributes.sides || "4", character)
    );
    part.roll = {
      dice: [],
    };
    part.roll.dice!.push({
      dice,
      sides,
      type: attributes.damageType,
    });
    const additionalDamage = v[ability] + damageBonus;

    if (additionalDamage !== 0) {
      part.roll.dice!.push({
        value: additionalDamage,
        type: attributes.damageType,
      });
    }

    let damageTotal = Math.floor(dice * (sides / 2 + 0.5)) + additionalDamage;
    if (damageTotal < 1) {
      damageTotal = 1;
    }
    let diceString = `${damageTotal} (${dice}d${sides}`;
    if (additionalDamage > 0) {
      diceString += ` + ${additionalDamage}`;
    } else if (additionalDamage < 0) {
      diceString += ` - ${Math.abs(additionalDamage)}`;
    }
    diceString += `)`;
    part.string = `${diceString} ${attributes.damageType}`;
    part.translationVariables!.damage = diceString;
    part.translationVariables!.damageType =
      attributes.damageType || "bludgeoning damage";

    if ("enchantment" in attributes) {
      part.translationKey = "rollableDamageEnchantment";
      const enchantment = calculateValue(
        attributes.enchantment as ValueDice,
        character
      );
      part.string += ` plus ${enchantment.string}`;
      if (
        enchantment.translationVariables &&
        "n" in enchantment.translationVariables
      ) {
        part.translationVariables!.valueEnchantment =
          enchantment.translationVariables.n;
      }
      if (
        enchantment.translationVariables &&
        "damageType" in enchantment.translationVariables
      ) {
        part.translationVariables!.enchantmentType =
          enchantment.translationVariables.damageType;
      }
      part.roll!.dice = [
        ...(part.roll!.dice || []),
        ...(enchantment.roll!.dice || []),
      ];
    } else {
      part.translationKey = "rollableDamage";
    }
  } else {
    // TODO: there should be an option to allow attacks that don't deal damage based on dice
    part.string += " — ";
    delete part.type;
    delete part.translationVariables;
  }

  parts.push(part);

  // versatile
  if (isVersatile) {
    parts.push(createPart(", ", "translatableText"));
    parts.push(createPart("or", "translatableText"));
    parts.push(createPart(" "));

    const versatilePart: DescriptionPart = {
      string: "",
      type: "diceRoll",
      translationKey: "rollableDamage",
      translationVariables: {},
      roll: {
        dice: [],
        name: variant.name || attributes.name || "Attack",
      },
    };

    const dice = parseExpressionNumeric(attributes.diceV || "1", character);
    const sides = roundDiceSides(
      parseExpressionNumeric(attributes.sidesV || "4", character)
    );
    versatilePart.roll!.dice = [];
    versatilePart.roll!.dice.push({
      dice,
      sides,
      type: attributes.damageType,
    });
    const additionalDamage = v[ability] + damageBonus;

    if (additionalDamage !== 0) {
      versatilePart.roll!.dice.push({
        value: additionalDamage,
        type: attributes.damageType,
      });
    }

    let damageTotal = Math.floor(dice * (sides / 2 + 0.5)) + additionalDamage;
    if (damageTotal < 1) {
      damageTotal = 1;
    }
    let diceString = `${damageTotal} (${dice}d${sides}`;
    if (additionalDamage > 0) {
      diceString += ` + ${additionalDamage}`;
    } else if (additionalDamage < 0) {
      diceString += ` - ${Math.abs(additionalDamage)}`;
    }
    diceString += `)`;
    versatilePart.string = `${diceString} ${attributes.damageType}`;
    versatilePart.translationVariables!.damage = diceString;
    versatilePart.translationVariables!.damageType =
      attributes.damageType || "bludgeoning damage";

    if ("enchantment" in attributes) {
      versatilePart.translationKey = "rollableDamageEnchantment";
      const enchantment = calculateValue(
        attributes.enchantment as ValueDice,
        character
      );
      versatilePart.string += ` plus ${enchantment.string}`;
      if (
        enchantment.translationVariables &&
        "n" in enchantment.translationVariables
      ) {
        versatilePart.translationVariables!.valueEnchantment =
          enchantment.translationVariables.n;
      }
      if (
        enchantment.translationVariables &&
        "damageType" in enchantment.translationVariables
      ) {
        versatilePart.translationVariables!.enchantmentType =
          enchantment.translationVariables.damageType;
      }
      versatilePart.roll!.dice = [
        ...(versatilePart.roll!.dice || []),
        ...(enchantment.roll!.dice || []),
      ];
    }
    parts.push(versatilePart);
    parts.push(createPart(" "));
    parts.push(createPart("if used with two hands", "translatableText"));
    if (isThrown) {
      parts.push(createPart(" "));
      parts.push(createPart("to make a melee attack", "translatableText"));
    }
  }

  if (isSpecial) {
    parts.push(createPart(". "));
    parts.push(createPart(attributes.special!));
  }

  return parts;
}
