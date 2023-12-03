import {
  getStatArrayFromObjects,
  getBonus,
  pushWithComma,
  getCurrentStatLimit,
} from "../functions";
import { Ability } from "./../stats";
import { Character, Stat } from "@/types";

export function calculateSavingThrows(character: Character) {
  const s = character.statistics!;
  const v = character.variables!;

  const savingThrows = getStatArrayFromObjects<Stat[]>(
    character,
    "savingThrows"
  );
  s.savingThrows = { string: "", values: {} };
  const abilityModifiers = s.abilityModifiers;
  const proficiency = s.proficiency;

  const limit = getCurrentStatLimit(character);

  for (let i = 0; i < savingThrows.length; i++) {
    for (let j = 0; j < savingThrows[i].length; j++) {
      if (!limit || limit >= (savingThrows[i][j].availableAt || 0)) {
        const savingThrow = savingThrows[i][j].value as Ability;
        s.savingThrows.values[savingThrow] =
          abilityModifiers[savingThrow] + proficiency;
      }
    }
  }

  for (const save in s.savingThrows.values) {
    const bonus = getBonus(character, `${save}Save`);
    if (bonus) {
      s.savingThrows.values[save as Ability]! += bonus;
    }

    const plusSign = s.savingThrows.values[save as Ability]! >= 0 ? "+" : "";
    s.savingThrows.string = pushWithComma(
      s.savingThrows.string,
      `${capitalizeFirst(save)} ${plusSign}${s.savingThrows.values[
        save as Ability
      ]!}`
    );
    v[`${save}SAVE` as Ability] = s.savingThrows.values[save as Ability]!;
  }

  if (!s.savingThrows.string) {
    delete s.savingThrows;
  }
}
