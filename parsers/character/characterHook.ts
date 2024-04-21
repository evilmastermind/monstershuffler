import type { Character, DescriptionPart } from "@/types";
import { createPart, replaceTags } from "@/parsers";

export function calculateCharacterHook(character: Character) {
  const c = character.character;
  const hook = c?.user?.characterHook || c?.characterHook;
  if (!hook) {
    return;
  }
  const hookParts = replaceTags(hook, character);

  const characterHook: DescriptionPart[] = [{ string: "The" }];

  if (c?.class?.name) {
    characterHook.push(createPart(" "));
    characterHook.push(createPart(c.class.name, "class", [], c?.class?.id));
  }

  if (c?.background?.name) {
    const pronouns = character.statistics!.pronouns!;
    const backgroundName =
      pronouns === "female" ? c.background.femaleName : c.background.name;
    characterHook.push(createPart(" "));
    characterHook.push(
      createPart(backgroundName, "background", [], c.background?.id)
    );
  }

  if (characterHook.length === 1) {
    characterHook.push(createPart(" "));
    characterHook.push(
      createPart(
        c?.racevariant?.name || c?.race?.name || "person",
        "race",
        [],
        c?.racevariant?.id || c?.race?.id
      )
    );
  }

  characterHook.push(createPart(" "));
  if (hook) {
    characterHook.push(...hookParts);
  }
  character.statistics!.characterHook = characterHook;
}
