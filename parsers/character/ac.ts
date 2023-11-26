import JSPath from "jspath";
import {
  getStatArrayFromObjects,
  parseExpressionNumeric,
  getBonusesForOneStatistic,
  calibrateStatistic,
  isNumber,
} from "@/parsers";
import { Character, Armor, Action, ChosenAction } from "@/types";

export function calculateArmorClass(character: Character) {
  const s = character.statistics!;
  let totalAC = 0;
  let dexMod = s.abilityModifiers.DEX;
  let armor: Armor = { name: "", AC: "0" };
  let armorAC = 0;

  // checking if the user has "disabled" the armor from other sources
  // (there should be an armor inside the 'user' object with an empty name "")
  const userArmor = character?.character?.user?.armor as Armor;
  if (userArmor && Object.hasOwn(userArmor, "name")) {
    armor = userArmor;
    armorAC = parseExpressionNumeric(armor.AC, character);
  } else {
    const armorArray = getStatArrayFromObjects<Armor>(character, "armor");
    armorArray?.forEach((a) => {
      const AC = parseExpressionNumeric(a.AC, character);
      if (AC > armorAC) {
        armor = a;
        armorAC = AC;
      }
    });
  }

  const armorBonuses = getBonusesForOneStatistic(character, "AC");
  let armorBonus = 0;
  let armorBonusString = "";

  armorBonuses.forEach((bonus) => {
    armorBonus += parseExpressionNumeric(bonus.value, character);
    if (bonus?.name) {
      if (armorBonusString) armorBonusString += ", ";
      armorBonusString += bonus.name;
    }
  });

  if (!armorAC) {
    // no armor
    totalAC = 10 + dexMod + armorBonus;
  } else {
    // stealth disadvantage trait
    if (armor.stealthDis === true) {
      const stealthDisActions = JSPath.apply(
        `..actions{.tag==="clankingarmordefault"}`,
        character
      ) as Action[];
      if (!stealthDisActions.length) {
        const stealthDisAction: Action = {
          tag: "clankingarmordefault",
          variants: [
            {
              name: "Stealth Disadvantage",
              type: "trait",
              description: `[Name] has disadvantage on Dexterity (Stealth) checks while wearing [his] ${armor.name} armor`,
            },
          ],
        };
        if (!character.character?.user) {
          character.character!.user = {};
        }
        if (!character.character?.user.actions) {
          character.character!.user.actions = [];
        }
        character.character!.user.actions.push(stealthDisAction);
      }
    } else {
      const stealthDisActions = JSPath.apply(
        `..actions{.tag==="clankingarmordefault"}`,
        character
      ) as ChosenAction[];
      if (stealthDisActions.length && character.character?.user?.actions) {
        const userActions = character.character.user.actions as ChosenAction[];
        character.character.user.actions = userActions.filter(
          (action) => action.tag === "clankingarmordefault"
        );
      }
    }

    // speed riduction if STR requirement is not met
    if (
      parseExpressionNumeric(armor?.minStr, character) > s.abilityScores?.STR
    ) {
      if (!s?.speeds?.values?.walk) {
        s.speeds = {
          values: {
            walk: -10,
          },
          string: "",
        };
      } else {
        s.speeds.values.walk -= 10;
      }
    }

    // max dex bonus
    if (armor?.maxDex !== undefined) {
      const maxDexBonus = parseExpressionNumeric(armor?.maxDex, character);

      if (dexMod > maxDexBonus || (dexMod < 0 && maxDexBonus === 0)) {
        dexMod = maxDexBonus;
      }
    }

    totalAC = armorAC + dexMod + armorBonus;
  }

  let armorString = armor.name;
  if (armorBonusString) {
    if (armorString) armorString += ", ";
    armorString += armorBonusString;
  }

  // ------- automatic calculation (CR) -------
  if (
    character.character?.CRCalculation?.name === "automatic" &&
    armor.isAutomaticCalcDisabled !== true &&
    isNumber(armor.AC)
  ) {
    totalAC = calibrateStatistic(character, totalAC, "AC");
  }

  s.AC = {
    number: totalAC,
    string: `${totalAC}`,
  };
  if (armorString) s.AC.string += ` (${armorString})`.toLowerCase();
  character.variables!.AC = totalAC;
}
