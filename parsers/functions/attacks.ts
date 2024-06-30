import type { Ability, Size } from "../stats";
import { sizeStats } from "../stats";
import { parseExpressionNumeric } from "./expressions";
import {
  createPart,
  getBonus,
  getPrioritizedStatistic,
  numberToSignedString,
} from "./statistics";
import { numberToWord, roundDiceSides } from "./numbers";
import { calculateValue } from "./values";
import type {
  AbilitiesEnum,
  ActionVariant,
  Attack,
  Character,
  DescriptionPart,
  Spells,
  ParsedDice,
  Weapon,
} from "@/types";

// ---------------------------------------------------------------------------
// ATTACKS PARSING
// ---------------------------------------------------------------------------

export function calculateAttack(
  attack: Attack,
  character: Character,
  name: string = "",
  ability: AbilitiesEnum = "STR"
) {
  const parts: DescriptionPart[] = [];
  const v = character.variables!;

  // default attributes
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

  // ERROR: there's still a choice that needs to be resolved
  if ("choice" in attributes) {
    return parts;
  }

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
      name: name || attributes.name || "Attack",
      dice: [
        {
          sides: 20,
          dice: 1,
          bonus: toHit,
          value: 10 + toHit,
        },
      ],
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
    translationKey: "value.target",
    translationVariables: { n: targets.toString() },
  });
  parts.push(createPart(". "));

  // damage
  parts.push(createPart("Hit:", "translatableText", ["italic"]));
  parts.push(createPart(" "));

  if ("dice" in attributes) {
    parts.push(
      createAttackDamagePart(
        name,
        ability,
        damageBonus,
        attributes,
        attack,
        character
      )
    );
  } else {
    // TODO: there should be an option to allow attacks that deal flat damage not based on dice
    parts.push(createPart(" — "));
  }

  // versatile
  if (isVersatile) {
    parts.push(createPart(", "));
    parts.push(createPart("or", "translatableText"));
    parts.push(createPart(" "));
    parts.push(
      createAttackDamagePart(
        name,
        ability,
        damageBonus,
        attributes,
        attack,
        character,
        true
      )
    );
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

function createAttackDamagePart(
  name: string,
  ability: Ability,
  damageBonus: number,
  attributes: Weapon,
  attack: Attack,
  character: Character,
  isVersatile = false
) {
  const v = character.variables!;
  const part: DescriptionPart = {
    string: "",
    type: "diceRoll",
  };
  const dice = parseExpressionNumeric(
    (isVersatile ? attributes.diceV : attributes.dice) || "1",
    character
  );
  const sides = roundDiceSides(
    parseExpressionNumeric(
      (isVersatile ? attributes.sidesV : attributes.sides) || "4",
      character
    )
  );
  part.roll = {
    dice: [],
    name: name || attributes.name || "Attack",
  };
  const parsedDice: ParsedDice = {
    dice,
    sides,
    type: attributes.damageType,
    value: 1,
  };
  const additionalDamage = v[ability] + damageBonus;

  if (additionalDamage !== 0) {
    parsedDice.bonus = additionalDamage;
  }

  let averageDamage = Math.floor(dice * (sides / 2 + 0.5)) + additionalDamage;
  if (averageDamage < 1) {
    averageDamage = 1;
  }
  parsedDice.value = averageDamage;
  let diceString = `${averageDamage} (${dice}d${sides}`;
  if (additionalDamage > 0) {
    diceString += ` + ${additionalDamage}`;
  } else if (additionalDamage < 0) {
    diceString += ` - ${Math.abs(additionalDamage)}`;
  }
  diceString += `)`;
  part.string = `${diceString} ${attributes.damageType}`;
  parsedDice.string = diceString;
  part.roll.dice.push(parsedDice);

  attack.enchantments?.forEach((enchantment) => {
    const parsedEnchantment = calculateValue(enchantment, character, undefined, true);
    part.string += ` plus ${parsedEnchantment.string}`;
    if ("roll" in parsedEnchantment && parsedEnchantment.roll) {
      if ("dice" in parsedEnchantment.roll && parsedEnchantment.roll.dice) {
        part.roll!.dice.push(...parsedEnchantment.roll.dice);
      }
    }
  });
  return part;
}
