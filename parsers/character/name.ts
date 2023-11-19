import { Character } from "@/types";

export function calculateName(character: Character) {
  const c = character.character;
  const prename = c.prename || "";
  const name = c.name || "";
  const surname = c.surname || "";

  character.statistics!.name = name;
  character.statistics!.prename = prename;
  character.statistics!.surname = surname;
  character.statistics!.fullName = `${prename} ${name} ${surname}`.trim();
}
