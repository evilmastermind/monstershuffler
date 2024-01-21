import {
  getPrioritizedStatistic,
  getStatArrayFromObjects,
  getCurrentStatLimit,
} from "../functions";
import type { Character, Spells, SpellGroup } from "@/types";

export function calculateSpells(character: Character) {
  const spells = getStatArrayFromObjects<Spells>(character, "spells");
  const prioritizedSpells = getPrioritizedStatistic<Spells>(
    character,
    "spells"
  );
}

export function makeTagsUnique(spells: Spells[]) {
  const tagsArray: string[] = [];
  let tagsNumber = 0;

  const groups: SpellGroup[] = [];
  const limit = getCurrentStatLimit(character);

  for (let i = 0; i < spells.length; i++) {
    const;
    for (let j = 0; j < spells[i].groups.length; j++) {
      const group = spells[i].groups[j];
      if (group.tag) {
        while (tagsArray.includes(group.tag)) {
          group.tag = `${group.tag}${tagsNumber}`;
          tagsNumber++;
        }
        tagsArray.push(group.tag);
      }
    }
  }
}
