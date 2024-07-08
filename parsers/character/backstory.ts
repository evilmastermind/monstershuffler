import type { Character } from "@/types";

export function calculateBackstoryInfo(character: Character) {
  const s = character.statistics!;
  s.race =
    character.character?.racevariant?.name ||
    character.character?.race?.name ||
    s.type.string;
  if ("class" in character.character && character.character.class) {
    s.class = character.character?.class?.name || "";
  }
  if ("age" in character.character && character.character.age) {
    s.age = `${character.character?.age.string}`;
  }
  if (character.character.trait) {
    s.personality = character.character.trait;
  }
  if (character.character.weight) {
    s.bodyType = character.character.weight;
  }
}
