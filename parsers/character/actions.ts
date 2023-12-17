import JSPath from "jspath";
import {
  getStatArrayFromObjects,
  getCurrentStatLimit,
  parseNameChoices,
  replaceTags,
} from "../functions";
import { parseExpressionNumeric } from "@/parsers";
import { Character, ChosenAction, ActionVariant, ParsedAction } from "@/types";

export function calculateActions(character: Character) {
  const actions = getStatArrayFromObjects<ChosenAction[]>(
    character,
    "actions"
  ).flat();

  const tempMultiAttack: ParsedAction[] = [];
  const tempMeleeAttacks: ParsedAction[] = [];
  const tempRangedAttacks: ParsedAction[] = [];
  const tempProfessionAttack: ParsedAction[] = [];
  character.statistics!.actions = [];
  character.statistics!.traits = [];
  character.statistics!.bonusActions = [];
  character.statistics!.reactions = [];
  character.statistics!.legendaryActions = [];

  const tagsArray: string[] = [];
  let tagsNumber = 0;

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    const limit = getCurrentStatLimit(character);
    if (
      !action?.variants?.length ||
      (action?.availableUntil && limit > action?.availableUntil)
    ) {
      continue;
    }

    // giving a unique tag to each action
    while (!Object.hasOwn(action, "tag") || tagsArray.includes(action?.tag)) {
      const type = action?.tag || action.variants[0].type || "action";
      if (isNaN(parseInt(type.charAt(type.length - 1))))
        action.tag = `${type}${tagsNumber}`;
      else {
        action.tag =
          type.slice(0, type.length - 1) +
          (parseInt(type.charAt(type.length - 1)) + 1);
      }
      tagsNumber++;
    }
    tagsArray.push(action.tag);

    let variant: ActionVariant | null = null;

    // finding the right variant for the current CR, if any
    for (const v of action.variants) {
      const availableAt = v.availableAt ?? -3;
      const currentAvailableAt = variant ? variant.availableAt ?? -3 : -3;
      if (availableAt <= limit && availableAt >= currentAvailableAt) {
        variant = v;
      }
    }
    if (!variant) {
      continue;
    }

    // fixing the name of the action
    let actionName = parseNameChoices(variant.name); // ex: "Fire | Cold | Lightning"
    actionName = capitalizeFirst(replaceTags(actionName, character)); // ex: "Cone of [damageType]"
    character.tags![action.tag] = actionName;

    if (variant.type === "attack") {
      variant?.attacks?.forEach((attack) => {
        if (attack.replaceName) {
          actionName = attack.name;
        }
      });
    }

    const parsedAction: ParsedAction = {
      name: actionName,
      tag: action.tag,
      priority: action.priority || 100,
      description:
        capitalizeFirst(replaceTags(variant.description, character)) || "",
    };

    // recharge
    if (variant.recharge) {
      const charges = parseExpressionNumeric(variant.charges, character) || 1;
      switch (variant.recharge) {
        case "turn":
          parsedAction.name += ` (${charges}/Turn)`;
          break;
        case "short":
          parsedAction.name += ` (${charges}/Short or Long Rest)`;
          break;
        case "day":
          parsedAction.name += ` (${charges}/Day)`;
          break;
        case "week":
          parsedAction.name += ` (${charges}/Week)`;
          break;
        case "month":
          parsedAction.name += ` (${charges}/Month)`;
          break;
        case "3–6":
          parsedAction.name += " (Recharge 3–6)";
          break;
        case "4–6":
          parsedAction.name += " (Recharge 4–6)";
          break;
        case "5–6":
          parsedAction.name += " (Recharge 5–6)";
          break;
        case "6–6":
          parsedAction.name += " (Recharge 6–6)";
          break;
      }
    }

    // cost (legendary actions)
    if (variant.cost && variant.type === "legendary") {
      const cost = parseExpressionNumeric(variant.cost, character) || 1;
      if (cost > 1) {
        parsedAction.name += ` (Costs ${variant.cost} Actions)`;
      }
    }

    // assigning the action to the correct array
    switch (variant.type) {
      case "attack":
        if (action.tag === "profession") {
          tempProfessionAttack.push(parsedAction);
        } else {
          const properties = JSPath.apply("..properties", variant.attacks);
          if (properties.includes("ranged")) {
            tempRangedAttacks.push(parsedAction);
          }
        }
        break;
      case "multiattack":
        tempMultiAttack.push(parsedAction);
        break;
      case "trait":
        character.statistics!.traits.push(parsedAction);
        break;
      case "action":
        character.statistics!.actions.push(parsedAction);
        break;
      case "bonus":
        character.statistics!.bonusActions.push(parsedAction);
        break;
      case "reaction":
        character.statistics!.reactions.push(parsedAction);
        break;
      case "legendary":
        character.statistics!.legendaryActions.push(parsedAction);
        break;
    }

    // sorting the arrays
    const sortFunction = (a: ParsedAction, b: ParsedAction) =>
      a.priority - b.priority;
    tempMultiAttack.sort(sortFunction);
    tempMeleeAttacks.sort(sortFunction);
    tempRangedAttacks.sort(sortFunction);
    character.statistics!.traits.sort(sortFunction);
    character.statistics!.actions.sort(sortFunction);
    character.statistics!.bonusActions.sort(sortFunction);
    character.statistics!.reactions.sort(sortFunction);
    character.statistics!.legendaryActions.sort(sortFunction);

    // merging the actions
    let actions = tempMultiAttack.concat(tempMeleeAttacks, tempRangedAttacks);
    if (actions.length === 0) {
      actions = actions.concat(tempProfessionAttack);
    }
    character.statistics!.actions = actions.concat(
      character.statistics!.actions
    );

    // legendary section - description
    // const legandaryActionsAvailable = getStatisticWithPriority(`.legendaryActionsAvailable`,object) || "3";
    // let string = `[Name] can take ${parseExpression(legandaryActionsAvailable,variables,`Legendary Charges`)} legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. [Name] regains spent legendary actions at the start of [his] turn.`;
    // string = replaceTags(object,string,tags);
    // object.statistics.LegendaryDescription = string;
  }
}
