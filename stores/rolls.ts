import type { DiceRoll, ResultByType } from "./rolls.d";
import type { Roll, DescriptionPart } from "@/types";

export const useRollsStore = defineStore("rolls", () => {
  const diceRolls: Ref<DiceRoll[]> = ref([]);

  function rollDice(part: DescriptionPart, monster: string) {
    const rollInfo = part.roll;

    // If there's no roll, just roll a d20
    if (!rollInfo) {
      const d20Roll = Math.floor(Math.random() * 20) + 1;
      return {
        roll: {
          dice: [
            {
              dice: 1,
              sides: 20,
            },
          ],
        },
        monster,
        d20Roll,
        rollDetails: `[${d20Roll}]`,
        resultsByType: [{ result: d20Roll }],
        totalResult: d20Roll,
        emojis: addEmojiByD20Roll(d20Roll),
      } as DiceRoll;
    }

    const diceRoll: DiceRoll = {
      roll: rollInfo,
      monster,
      rollDetails: "",
      resultsByType: [],
      totalResult: 0,
      emojis: [],
    };

    for (let i = 0; i < rollInfo.dice.length; i++) {
      const dice = rollInfo.dice[i];
      let totalForCurrentGroup = 0;
      if ("dice" in dice) {
        addPlusSign(diceRoll.rollDetails, true);
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
          rollDetailsForCurrentGroup += `+${dice.bonus || 0}`;
        }
        addResultByType(
          totalForCurrentGroup,
          diceRoll.resultsByType,
          dice.type
        );
        diceRoll.totalResult += totalForCurrentGroup;
        diceRoll.rollDetails += rollDetailsForCurrentGroup;
        if (part.type === "d20Roll") {
          diceRoll.emojis.push(...addEmojiByD20Roll(result));
          diceRoll.d20Roll = result;
        } else {
          diceRoll.emojis.push(...addEmojiByType(dice.type));
        }
      } else {
        diceRoll.rollDetails += `${addPlusSign(diceRoll.rollDetails, true)}${
          dice.value
        }`;
        addResultByType(dice.value, diceRoll.resultsByType, dice.type);
        diceRoll.totalResult += dice.value;
      }
      console.log(diceRoll.rollDetails);
    }

    diceRolls.value.push(diceRoll);
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

  return {
    diceRolls,
    rollDice,
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
      return ["ᯤ", "ᯤ", "ᯤ"];
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
