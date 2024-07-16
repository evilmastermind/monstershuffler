import {
  getStatArrayFromObjects,
  parseExpressionNumeric,
  getBonusesForOneStatistic,
  calibrateStatistic,
  isNumber,
  createPart,
} from "@/parsers";
import type { Character, Armor, Condition } from "@/types";

const createClankingArmorCondition = (armorName: string) => {
  return {
    name: "_clankingarmor",
    actions: [
      {
        tag: "clankingarmordefault",
        variants: [
          {
            name: "Stealth Disadvantage",
            type: "trait",
            description: `[Name] has disadvantage on Dexterity (Stealth) checks while wearing [his] ${armorName} armor`,
          },
        ],
      },
    ],
    bonuses: {
      walkBonus: {
        value: "-10",
      },
    },
  } as Condition;
};

export function calculateArmorClass(character: Character) {
  const s = character.statistics!;
  const v = character.variables!;

  let totalAC = 0;
  let dexMod = v.DEX;
  let armor: Armor = { name: "", AC: "0" };
  let armorAC = 0;

  s.AC = {
    number: 0,
    string: "",
    array: [],
  };

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
  let hasExpression = false;

  armorBonuses.forEach((bonus) => {
    if (!isNumber(bonus.value)) {
      hasExpression = true;
    }
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
    // stealth disadvantage trait & speed reduction
    if (
      armor.stealthDis === true &&
      parseExpressionNumeric(armor?.minStr, character) > v?.STR
    ) {
      if (!character.character.conditions) {
        character.character.conditions = [];
      }
      if (
        character.character.conditions?.findIndex(
          (c) => c.name === "_clankingarmor"
        ) === -1
      ) {
        character.character.conditions?.push(
          createClankingArmorCondition(armor.name)
        );
      }
    } else if (
      character.character.conditions &&
      character.character.conditions?.findIndex(
        (c) => c.name === "_clankingarmor"
      ) !== -1
    ) {
      character.character.conditions = character.character.conditions?.filter(
        (c) => c.name !== "_clankingarmor"
      );
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
  if (armor.name) {
    s.AC.array?.push(createPart(armor.name.toLowerCase(), "armor"));
  }
  if (armorBonusString) {
    if (s.AC.array?.length) {
      s.AC.array?.push(createPart(", "));
    }
    s.AC.array?.push(createPart(armorBonusString.toLowerCase(), "armor"));
  }

  // ------- automatic calculation (CR) -------
  if (
    // character.character?.CRCalculation?.name === "automatic" &&
    armor.isAutomaticCalcDisabled !== true &&
    isNumber(armor.AC) &&
    !hasExpression
  ) {
    totalAC = calibrateStatistic(character, totalAC, "AC");
  }

  s.AC!.number = totalAC;
  if (s.AC!.array!.length) {
    s.AC!.array!.push(createPart(")"));
    s.AC!.array!.unshift(createPart(" ("));
  }
  s.AC!.array!.unshift(createPart(totalAC.toString(), "text"));
  s.AC!.string = s.AC!.array!.reduce((acc, obj) => acc + obj.string, "");
  character.variables!.AC = totalAC;
}
