import { getPrioritizedStatistic } from "../functions";
import { typeToNumber } from "../stats";
import { Character } from "@/types";

export function calculateType(character: Character) {
  const type = getPrioritizedStatistic<string>(character, "type") || "Humanoid";
  character.tags!.type = type;
  character.statistics!.type = {
    string: type,
    number: typeToNumber(type),
  };
}
