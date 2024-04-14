import type { Size } from "../stats";
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
  ActionVariant,
  Attack,
  Character,
  DescriptionPart,
  ValueDice,
  Spells,
} from "@/types";

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
      name: variant.name || attributes.name || "Attack",
      dice: [
        {
          sides: 20,
          dice: 1,
          bonus: toHit,
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
      name: variant.name || attributes.name || "Attack",
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

    if ("enchantment" in attack) {
      part.translationKey = "rollableDamageEnchantment";
      const enchantment = calculateValue(
        attack.enchantment as ValueDice,
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

    if ("enchantment" in attack) {
      versatilePart.translationKey = "rollableDamageEnchantment";
      const enchantment = calculateValue(
        attack.enchantment as ValueDice,
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
