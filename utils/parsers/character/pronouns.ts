import { Character } from "@/types/objects";
import { getPrioritizedStatistic } from "@/utils/parsers/functions";

export function calculatePronouns(character: Character) {
  const pronouns = getPrioritizedStatistic<string>(character, "pronouns");
  // @ts-expect-error for some reason pronouns definition is not read from the schema
  character.statistics!.pronouns = pronouns || "thing";
}
