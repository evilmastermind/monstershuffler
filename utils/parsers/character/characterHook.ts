import { Character, DescriptionPart } from "@/types/objects";
import { replaceTags } from "@/utils/parsers";

export function calculateCharacterHook(character: Character) {
  const c = character.character;
  let hook = c?.user?.characterHook || c?.characterHook;
  if (!hook) {
    return;
  }
  hook = replaceTags(hook, character);

  const characterHook: DescriptionPart[] = [{ string: "The" }];

  const className = c?.class?.name || "";
  const pronouns: string = character.statistics!.pronouns!;
  const backgroundName =
    pronouns === "female"
      ? c?.background?.femaleName || ""
      : c?.background?.name || "";
  const raceName = c?.race?.name || "";
  if (c?.class?.name) {
    const part: DescriptionPart = {
      string: c?.class?.name,
      type: "class",
    };
    if (c?.class?.id) {
      part.id = c.class.id;
    }
    characterHook.push(part);
  }
  if (c?.background?.name) {
    const backgroundName =
      pronouns === "female"
        ? c?.background?.femaleName || ""
        : c?.background?.name || "";
    const part: DescriptionPart = {
      string: backgroundName,
      type: "background",
    };
    if (c?.background?.id) {
      part.id = c.background.id;
    }
    characterHook.push(part);
  }
  if (!c?.class?.name && !c?.background?.name) {
    characterHook.push({
      string: c?.race?.name || c.name,
    });
  }
  characterHook.push({
    string: hook,
  });
  character.statistics!.characterHook = characterHook;
}
