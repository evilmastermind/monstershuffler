import { getStatArrayFromObjects } from "../functions";
import { Character, Action } from "@/types";

export function calculateActions(character: Character) {
  const actions = getStatArrayFromObjects<Action[]>(
    character,
    "actions"
  ).flat();

  const tempMultiAttack = [];
  const tempMeleeAttacks = [];
  const tempRangedAttacks = [];
  const tempProfessionAttack = [];
  // const tempActions = character.statistics.actions;
  // const tempTraits = character.statistics.traits;
  // const tempBonusActions = character.statistics.bonusActions;
  // const tempReactions = character.statistics.reactions;
  // const tempLegendaryActions = character.statistics.legendaryActions;

  // tools to give unique tags to actions
  const tagsArray: string[] = [];
  let tagsNumber = 0;

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    // giving a unique tag to each action
    while (Object.hasOwn(action, "tag") || tagsArray.includes(action?.tag)) {
      const type = actions[action]?.tag || actions[action]?.type || "action";
      // adding a number at the end of the tag
      if (isNaN(type.charAt(type.length - 1)))
        actions[action].tag = `${type}${tagsNumber}`;
      // incrementing the number at the end of the tag
      else {
        actions[action].tag =
          type.slice(0, type.length - 1) +
          (parseInt(type.charAt(type.length - 1)) + 1);
      }
      tagsNumber++;
    }
    tagsArray.push(actions[action].tag);
  }
}
