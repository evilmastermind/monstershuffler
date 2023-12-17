import { parseExpressionNumeric } from "@/parsers";
import {
  getStatArrayFromObjects,
  getCurrentStatLimit,
  getPrioritizedStatistic,
  pushWithComma,
  createPart,
} from "@/parsers/functions";
import type { Character, DescriptionPart, Stat } from "@/types";

export function calculateLanguages(character: Character) {
  const s = character.statistics!;
  const v = character.variables!;

  const languages = getStatArrayFromObjects<Stat[]>(character, "languages");
  const limit = getCurrentStatLimit(character);

  s.languages = {
    string: "",
    array: [],
  };

  for (let i = 0; i < languages.length; i++) {
    for (let j = 0; j < languages[i].length; j++) {
      if (
        languages[i][j].availableAt === undefined ||
        limit >= languages[i][j].availableAt!
      ) {
        if (s.languages.array!.length) {
          s.languages.array!.push(createPart(", "));
        }
        const descriptionPart: DescriptionPart = {
          string: languages[i][j].value,
          type: "language",
        };
        if (languages[i][j].id) {
          descriptionPart.id = languages[i][j].id;
        }
        s.languages.array!.push(descriptionPart);
      }
    }
  }

  const canSpeakQuery = getPrioritizedStatistic<boolean>(character, "canSpeak");
  const canSpeak = canSpeakQuery !== undefined ? canSpeakQuery : true;
  const telepathy = getPrioritizedStatistic<string>(character, "telepathy");

  if (!canSpeak) {
    s.canSpeak = false;
    if (s.languages.array!.length) {
      s.languages.array!.push(createPart(" "));
      s.languages.array!.push(
        createPart("but can't speak", "translatableText")
      );
      s.languages.array!.unshift(createPart(" "));
      s.languages.array!.unshift(createPart("Understands", "translatableText"));
    } else {
      s.languages.array!.unshift(createPart("Can't speak", "translatableText"));
    }
  }

  if (telepathy) {
    s.telepathy = parseExpressionNumeric(telepathy, character);
    if (s.languages.array!.length) {
      s.languages.array!.push(createPart(", "));
    }
    s.languages.array!.push(createPart("telepathy", "translatableText"));
    s.languages.array!.push(createPart(" ", "translatableText"));
    s.languages.array!.push(createPart(`${s.telepathy}`, "ft"));
    v.TELEPATHY = s.telepathy;
  }

  if (!s.languages.array!.length) {
    s.languages.array!.push(createPart("—"));
  }

  s.languages.string = s.languages.array!.reduce(
    (acc, obj) => acc + obj.string,
    ""
  );
}
