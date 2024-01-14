import JSPath from "jspath";
import {
  getStatArrayFromObjects,
  getCurrentStatLimit,
  parseNameChoices,
  replaceTags,
  createPart,
  getPrioritizedStatistic,
} from "../functions";
import { parseExpressionNumeric } from "@/parsers";
import type {
  Character,
  ChosenAction,
  ActionVariant,
  DescriptionPart,
  StatStringArrayWithName,
} from "@/types";

export function calculateActions(character: Character) {
  const tempMultiAttack: StatStringArrayWithName[] = [];
  const tempMeleeAttacks: StatStringArrayWithName[] = [];
  const tempRangedAttacks: StatStringArrayWithName[] = [];
  const tempProfessionAttack: StatStringArrayWithName[] = [];
  character.statistics!.actions = [];
  character.statistics!.traits = [];
  character.statistics!.bonusActions = [];
  character.statistics!.reactions = [];
  character.statistics!.legendaryActions = [];

  const s = character.statistics!;
  const v = character.variables!;
  const t = character.tags!;

  const tagsArray: string[] = [];
  let tagsNumber = 0;

  const actions = getStatArrayFromObjects<ChosenAction[]>(
    character,
    "actions"
  ).flat();

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
      const type = action?.tag || action?.variants[0]?.type || "action";
      if (isNaN(parseInt(type.charAt(type.length - 1)))) {
        action.tag = `${type}${tagsNumber}`;
      } else {
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
    if (variant === null) {
      continue;
    }

    // fixing the name of the action
    let actionName = parseNameChoices(variant.name); // ex: "Fire | Cold | Lightning"
    actionName = replaceTags(actionName, character, variant).reduce(
      (acc, obj) => acc + obj.string,
      ""
    ); // ex: "Cone of [damageType]"

    if (actionName !== variant.name) {
      character.tags![action.tag] = capitalizeFirst(actionName);
    }

    if (variant.type === "attack") {
      variant?.attacks?.forEach((attack) => {
        if (
          attack.replaceName &&
          attack?.attributes &&
          "name" in attack?.attributes &&
          attack?.attributes?.name
        ) {
          actionName = attack.attributes.name;
        }
      });
    }

    const parsedActionArray = replaceTags(
      variant.description,
      character,
      variant
    );

    actionName = capitalizeFirst(actionName);

    const parsedAction: StatStringArrayWithName = {
      name: actionName,
      nameArray: [{ string: actionName }],
      tag: action.tag,
      priority: action.priority || 100,
      string: parsedActionArray.reduce((acc, obj) => acc + obj.string, ""),
      array: parsedActionArray,
    };

    // recharge
    if (variant.recharge) {
      parsedAction.nameArray.push(createPart(" ("));
      parsedAction.recharge = variant.recharge;
      const charges = parseExpressionNumeric(variant.charges, character) || 1;
      const descriptionPart: DescriptionPart = {
        string: "",
        type: "resource",
      };
      if (charges) {
        parsedAction.charges = charges;
      }
      switch (variant.recharge) {
        case "turn":
          descriptionPart.string = `${charges}/Turn`;
          break;
        case "short":
          descriptionPart.string = `${charges}/Short or Long Rest`;
          break;
        case "day":
          descriptionPart.string = `${charges}/Day`;
          break;
        case "week":
          descriptionPart.string = `${charges}/Week`;
          break;
        case "month":
          descriptionPart.string = `${charges}/Month`;
          break;
        case "3-6":
          descriptionPart.string = "Recharge 3–6";
          break;
        case "4-6":
          descriptionPart.string = "Recharge 4–6";
          break;
        case "5-6":
          descriptionPart.string = "Recharge 5–6";
          break;
        case "6-6":
          descriptionPart.string = "Recharge 6–6";
          break;
      }
      parsedAction.nameArray.push(descriptionPart);
      parsedAction.nameArray.push(createPart(")"));
    }

    // cost (legendary actions)
    if (variant.cost && variant.type === "legendary") {
      const cost = parseExpressionNumeric(variant.cost, character) || 1;
      parsedAction.cost = cost;
      if (cost > 1) {
        parsedAction.nameArray.push(createPart(" ("));
        parsedAction.nameArray.push(createPart(`Costs ${cost} Actions`));
        parsedAction.nameArray.push(createPart(")"));
      }
    }

    parsedAction.name = parsedAction.nameArray.reduce(
      (acc, obj) => acc + obj.string,
      ""
    );

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
  }

  // sorting the arrays
  const sortFunction = (
    a: StatStringArrayWithName,
    b: StatStringArrayWithName
  ) => a.priority - b.priority;
  tempMultiAttack.sort(sortFunction);
  tempMeleeAttacks.sort(sortFunction);
  tempRangedAttacks.sort(sortFunction);
  character.statistics!.traits.sort(sortFunction);
  character.statistics!.actions.sort(sortFunction);
  character.statistics!.bonusActions.sort(sortFunction);
  character.statistics!.reactions.sort(sortFunction);
  character.statistics!.legendaryActions.sort(sortFunction);

  // merging the actions
  let mergedActions = tempMultiAttack.concat(
    tempMeleeAttacks,
    tempRangedAttacks
  );
  if (mergedActions.length === 0) {
    mergedActions = mergedActions.concat(tempProfessionAttack);
  }
  character.statistics!.actions = mergedActions.concat(
    character.statistics!.actions
  );

  const legendaryActionsMax =
    getPrioritizedStatistic<string>(character, "legendaryActionsMax") || "3";

  if (legendaryActionsMax) {
    s.legendaryActionsMax = parseExpressionNumeric(
      legendaryActionsMax,
      character
    );
    s.legendaryActionsIntro = {
      string: "",
      array: [],
    };

    const legArray = s.legendaryActionsIntro!.array;
    legArray.push({
      string: `${t.Name} can take ${s.legendaryActionsMax} legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. ${t.Name} regains spent legendary actions at the start of ${t.his} turn.`,
      type: "translatableText",
      translationKey: "legendaryActionsIntro",
      translationVariables: {
        name: t.Name,
        his: t.his,
        number: s.legendaryActionsMax,
      },
    });
  }
}
