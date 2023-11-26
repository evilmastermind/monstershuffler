import { parseExpressionNumeric } from "@/parsers";
import {
  getStatArrayFromObjects,
  getCurrentStatLimit,
  getPrioritizedStatistic,
  pushWithComma,
} from "@/parsers/functions";
import type { Character, DescriptionPart, Stat } from "@/types";

export function calculateLanguages(character: Character) {
  const s = character.statistics!;

  const languages = getStatArrayFromObjects<Stat[]>(character, "languages");
  const limit = getCurrentStatLimit(character);

  for (let i = 0; i < languages.length; i++) {
    for (let j = 0; j < languages[i].length; j++) {
      if (!limit || limit >= (languages[i][j].availableAt || 0)) {
        if (!s.languages) {
          s.languages = {
            string: "",
            values: [],
          };
        }
        const descriptionPart: DescriptionPart = {
          string: languages[i][j].value,
          type: "language",
        };
        if (languages[i][j].id) {
          descriptionPart.id = languages[i][j].id;
        }
        s.languages.values.push(descriptionPart);
      }
    }
  }

  const canSpeakQuery = getPrioritizedStatistic<boolean>(character, "canSpeak");
  const canSpeak = canSpeakQuery !== undefined ? canSpeakQuery : true;
  const telepathy = getPrioritizedStatistic<string>(character, "telepathy");

  if (!s.languages) {
    s.languages = {
      string: "",
      values: [],
    };
  }

  s.languages.string = s.languages.values.join(", ");
  if (!canSpeak) {
    s.canSpeak = false;
    if (s.languages.string) {
      s.languages.string = `Understands ${s.languages.string} but can't speak`;
    } else {
      s.languages.string = "Can't speak";
    }
  }
  if (telepathy) {
    s.telepathy = parseExpressionNumeric(telepathy, character);
    s.languages.string = pushWithComma(
      s.languages.string,
      `telepathy ${s.telepathy} ft`
    );
  }

  if (!s.languages.string) {
    s.languages.string = "—";
  }
}
