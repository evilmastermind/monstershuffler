import { skillTypes } from "../stats";
import {
  getStatArrayFromObjects,
  getCurrentStatLimit,
  getBonus,
  pushWithComma,
  sortObject,
} from "@/parsers/functions";
import type { Character, Stat } from "@/types";

export function calculateSkills(character: Character) {
  const s = character.statistics!;
  const v = character.variables!;

  const skills = getStatArrayFromObjects<Stat[]>(character, "skills");

  const abilityModifiers = s.abilityModifiers;
  const proficiency = s.proficiency;

  const limit = getCurrentStatLimit(character);

  for (let i = 0; i < skills.length; i++) {
    for (let j = 0; j < skills[i].length; j++) {
      if (
        skills[i][j].availableAt === undefined ||
        limit >= skills[i][j].availableAt!
      ) {
        if (!s.skills) {
          s.skills = { string: "", values: {} };
        }
        const skill = skills[i][j].value;
        const ability = skillTypes[skill];
        s.skills.values[skill] = abilityModifiers[ability] + proficiency;
      }
    }
  }

  if (s.skills?.values?.length) {
    s.skills.values = sortObject(s.skills.values);
  }

  for (const skill in s.skills?.values) {
    const bonus = getBonus(character, `${skill.replace(/\s/g, "")}`);
    if (bonus) {
      s.skills.values[skill]! += bonus;
    }

    const plusSign = s.skills.values[skill]! >= 0 ? "+" : "";
    s.skills.string = pushWithComma(
      s.skills.string,
      `${capitalizeFirst(skill)} ${plusSign}${s.skills.values[skill]!}`
    );
    v[skill.replace(/\s/g, "").toUpperCase() as "PERSUASION"] =
      s.skills.values[skill]!;
  }
}
