import type { DiceRoll, ResultByType, Roll, ParsedDice } from "@/types";
import { numberToSignedString } from "@/parsers";

export const useRollsStore = defineStore("rolls", () => {
  const diceRolls = shallowRef<DiceRoll[]>([]);
  const maxSize = 50;
  const localStorageName = "diceRolls";

  function rollDice(roll: Roll, monster: string) {
    const diceRoll: DiceRoll = {
      roll,
      monster,
      rollDetails: "",
      resultsByType: [],
      totalResult: 0,
      emojis: [],
    };

    const isD20Roll =
      roll.dice.length >= 1 &&
      "sides" in roll.dice[0] &&
      roll.dice[0].sides === 20 &&
      roll.dice[0].dice === 1;

    if (roll.name) {
      diceRoll.rollName = roll.name;
    }

    for (let i = 0; i < roll.dice.length; i++) {
      const dice = roll.dice[i];
      let totalForCurrentGroup = 0;
      if ("dice" in dice) {
        diceRoll.rollDetails = addPlusSign(diceRoll.rollDetails, true);
        let rollDetailsForCurrentGroup = "";
        let result = 1;
        for (let j = 0; j < dice.dice; j++) {
          result = Math.floor(Math.random() * dice.sides) + 1;
          rollDetailsForCurrentGroup = `${addPlusSign(
            rollDetailsForCurrentGroup
          )}[${result}]`;
          totalForCurrentGroup += result;
        }
        if (dice.bonus) {
          totalForCurrentGroup += dice.bonus || 0;
          rollDetailsForCurrentGroup += numberToSignedString(dice.bonus || 0);
        }
        addResultByType(
          totalForCurrentGroup,
          diceRoll.resultsByType,
          dice.type
        );
        diceRoll.totalResult += totalForCurrentGroup;
        diceRoll.rollDetails += rollDetailsForCurrentGroup;
        if (isD20Roll) {
          diceRoll.emojis.push(...addEmojiByD20Roll(result));
          diceRoll.d20Roll = result;
        } else {
          diceRoll.emojis.push(...addEmojiByType(dice.type));
        }
      } else {
        diceRoll.rollDetails = `${addPlusSign(diceRoll.rollDetails, true)}${
          dice.value
        }`;
        addResultByType(dice.value, diceRoll.resultsByType, dice.type);
        diceRoll.totalResult += dice.value;
      }
    }

    addDie(diceRoll);
    return diceRoll;

    /**
     * Roll details:
     * - the original roll details (so the user can reroll again)
     * - Monster Name
     * - Action Used
     * - Total value
     * - Total value divided by types
     *
     * Changes:
     * - should I move the d20 bonus inside the roll? YES
     * - 5e.tools: Shift+Click to roll with advantage, Ctrl+Click to roll with disadvantage
     *
     * What do I want to show the user?
     *
     * Adult Sapphire Dragon
     * Bite: 20 (15 piercing + 10 cold)
     * [4]+[6]+15 + [10]
     *
     * do I want users to change those values? NOT FOR NOW
     *
     *
     * Adult Sapphire Dragon (it's the monster's name)
     * - string
     * Bite (it's the action used)
     * - string
     * 20 (it's the total value)
     * - number
     * (15 piercing + 10 cold) (it's the total value divided by types)
     * - ResultByType[]
     * [4]+[6]+15 + [10] (it's the original roll details)
     * - string
     */
  }

  function rollDiceAsString(rollAsString = "1d20") {
    const parsedRoll = parseRollAsString(rollAsString);
    return rollDice(parsedRoll, "");
  }

  function parseRollAsString(rollAsString: string) {
    /**
     * A roll as string can be something like:
     * 1d20 - 5 + 1d6 - 4 + 2
     * It's made of:
     * - dice rolls (two numbers separated by a "d")
     * - a bonus (a number)
     * - + and - signs as separators
     *
     * I need to:
     * 1) remove spaces
     * 2) split the string by the + and - signs.
     *    The - sign is allowed only before a number and will make it negative
     * 3) for each part, check if it's a dice roll or a bonus
     * 4) if it's a dice roll, split it by the "d" and create a "ParsedDice" object
     * 5) if it's a bonus, create a "ParsedExpression" object
     */
    const rollWithoutSpaces = rollAsString.toLowerCase().replace(/\s/g, "");
    const parts = rollWithoutSpaces.split(/(?=[+-])/);
    const roll: Roll = {
      dice: [],
      name: "",
    };
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (part.includes("d")) {
        const [dice, bonus] = part.split(/(?=[+-])/);
        const [diceRoll, sides] = dice.split("d");
        let parsedDice = Math.abs(parseInt(diceRoll));
        if (parsedDice > 10000) {
          parsedDice = 10000;
        }
        let parsedSides = parseInt(sides);
        if (parsedSides > 100000) {
          parsedSides = 100000;
        }
        const newDie: ParsedDice = {
          dice: parsedDice,
          sides: parsedSides,
        };
        if (bonus) {
          newDie.bonus = parseInt(bonus);
        }
        roll.dice.push(newDie);
      } else {
        roll.dice.push({
          value: parseInt(part),
        });
      }
    }
    return roll;
  }

  function addDie(die: DiceRoll) {
    if (diceRolls.value.length === maxSize) {
      diceRolls.value.shift();
    }
    diceRolls.value.push(die);
    triggerRef(diceRolls);
    saveToLocalStorage();
  }

  function clear() {
    diceRolls.value = [];
    saveToLocalStorage();
  }

  function saveToLocalStorage() {
    localStorage.setItem(localStorageName, JSON.stringify(diceRolls.value));
  }

  function loadFromLocalStorage() {
    const loadedDiceRolls = localStorage.getItem(localStorageName);
    if (loadedDiceRolls) {
      diceRolls.value.push(...JSON.parse(loadedDiceRolls));
    }
  }

  return {
    diceRolls,
    rollDice,
    rollDiceAsString,
    clear,
    loadFromLocalStorage,
  };
});

function addResultByType(
  result: number,
  resultsByType: ResultByType[],
  type?: string
) {
  const index = resultsByType.findIndex((r) => r.type === type);
  if (index === -1) {
    resultsByType.push({ result, type });
  } else {
    resultsByType[index].result += result;
  }
}

function addPlusSign(rollDetails: string, spaces = false) {
  if (spaces) {
    return rollDetails ? `${rollDetails} + ` : "";
  }
  return rollDetails ? `${rollDetails}+` : "";
}

function addEmojiByType(type?: string) {
  switch (type) {
    case "acid damage":
      return ["🧪", "🟢", "🧪"];
      break;
    case "bludgeoning damage":
      return ["🔨", "🛡️", random(1, 2) === 1 ? "👊🏼" : "👊🏾"];
      break;
    case "cold damage":
      return ["❄️", "🥶", "💧", "🧊"];
      break;
    case "fire damage":
      return ["🔥", "💥"];
      break;
    case "force damage":
      return ["💫", "✴"];
      break;
    case "lightning damage":
      return ["⚡"];
      break;
    case "necrotic damage":
      return ["💀", "🦴", "🦴"];
      break;
    case "piercing damage":
      return ["⛏️", "🗡️", "🗡️", "🏹", "🏹"];
      break;
    case "poison damage":
      return ["☠️", "🐍", "🍄", "🕷️"];
      break;
    case "psychic damage":
      return ["🧠", "🌀", "🌀"];
      break;
    case "radiant damage":
      return ["☀️", "🌟", "✨"];
      break;
    case "slashing damage":
      return ["⚔️", "🔪", "🪓"];
      break;
    case "thunder damage":
      return ["ᯤ", "😱", "🔈"];
    case "hit point":
    case "temporary hit point":
      return ["❤️‍🩹", "❤️"];
      break;
    default:
      return "🎲";
      break;
  }
}

function addEmojiByD20Roll(result: number) {
  if (result === 20) {
    return ["🎉", "🍀", "🍀"];
  } else if (result === 1) {
    return ["💩"];
  } else {
    return ["🎲"];
  }
}

/** 
switch (type) {
  case "acid damage":
    return ["🧪", "🟢", "🧪"];
    break;
  case "bludgeoning damage":
    return ["🔨", "🛡️", random(1, 2) === 1 ? "👊🏼" : "👊🏾"];
    break;
  case "cold damage":
    return ["❄️", "🥶", "💧", "🧊"];
    break;
  case "fire damage":
    return ["🔥", "💥"];
    break;
  case "force damage":
    return ["💫", "✴"];
    break;
  case "lightning damage":
    return ["⚡"];
    break;
  case "necrotic damage":
    return ["💀", "🦴", "🦴"];
    break;
  case "piercing damage":
    return ["⛏️", "🗡️", "🗡️", "🏹", "🏹"];
    break;
  case "poison damage":
    return ["☠️", "🐍", "🍄", "🕷️"];
    break;
  case "psychic damage":
    return ["🧠", "🌀", "🌀"];
    break;
  case "radiant damage":
    return ["☀️", "🌟", "✨"];
    break;
  case "slashing damage":
    return ["⚔️", "🔪", "🪓"];
    break;
  case "thunder damage":
    return ["ᯤ", "ᯤ", "ᯤ"];
  case "hit point":
  case "temporary hit point":
    return ["❤️‍🩹", "❤️"];
    break;
  default:
    return "🎲";
    break;
}
*/
