import {
  addCommaIfNotEmpty,
  getStatArrayFromObjects,
  getBonus,
  getCurrentStatLimit,
  createPart,
} from "../functions";
import { Ability, abilities } from "./../stats";
import { Character, Stat } from "@/types";

export function calculateSavingThrows(character: Character) {
  const s = character.statistics!;
  const v = character.variables!;

  const savingThrows = getStatArrayFromObjects<Stat[]>(
    character,
    "savingThrows"
  );
  const savingThrowValues: { [K in Ability]?: number } = {};
  s.savingThrows = { string: "", array: [] };
  const abilityModifiers = s.abilityModifiers;
  const proficiency = s.proficiency;

  const limit = getCurrentStatLimit(character);

  for (let i = 0; i < savingThrows.length; i++) {
    for (let j = 0; j < savingThrows[i].length; j++) {
      if (
        savingThrows[i][j].availableAt === undefined ||
        limit >= savingThrows[i][j].availableAt!
      ) {
        const savingThrow = savingThrows[i][j].value as Ability;
        const savingThrowValue = abilityModifiers[savingThrow] + proficiency;

        savingThrowValues[savingThrow] = savingThrowValue;
      }
    }
  }

  for (const key in savingThrowValues) {
    if (
      !Object.hasOwn(savingThrowValues, key) ||
      savingThrowValues[key as Ability] === undefined
    ) {
      continue;
    }
    const ability = key as Ability;
    const bonus = getBonus(character, `${ability}Save`);
    if (bonus) {
      savingThrowValues[ability]! += bonus;
    }
    if (savingThrowValues[ability] === 0) {
      continue;
    }

    addCommaIfNotEmpty(s.savingThrows.array);
    s.savingThrows.array!.push(
      createPart(capitalizeFirst(ability), "savingThrow")
    );
    s.savingThrows.array!.push(createPart(" "));
    const valueAsString =
      savingThrowValues[ability]! > 0
        ? `+${savingThrowValues[ability]}`
        : `${savingThrowValues[ability]}`;
    s.savingThrows.array!.push(
      createPart(valueAsString, "rollableNumberWithSign")
    );
  }

  for (const ability in abilities) {
    v[`${ability}SAVE` as Ability] =
      savingThrowValues[ability as Ability]! ??
      abilityModifiers[ability as Ability];
  }

  s.savingThrows.string = s.savingThrows.array!.reduce(
    (acc, obj) => acc + obj.string,
    ""
  );

  if (!s.savingThrows.string) {
    delete s.savingThrows;
  }
}
