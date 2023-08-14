import { Character } from "@/types/objects";

export function calculateCharacterHook(character: Character) {
  const c = character.character;
  if (c?.user?.characterHook) {
    character.statistics!.characterHook = replaceTags(c.user.characterHook);
  }
}
