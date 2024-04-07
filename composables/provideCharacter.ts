import type { Character, StatStringArrayWithName } from "@/types";

export function useProvideCharacter(character: Ref<Character>) {
  const moral = computed(() => {
    const alignment = character.value?.statistics?.alignment?.string || "";
    if (alignment.includes("Good")) {
      return "text-text-good fill-background-good border-good decoration-good";
    } else if (alignment.includes("Evil")) {
      return "text-text-evil fill-background-evil border-complementary decoration-evil";
    } else {
      return "text-text-neutral fill-background-neutral border-neutral decoration-neutral";
    }
  });

  const moralDecoration = computed(() => {
    const alignment = character.value?.statistics?.alignment?.string || "";
    if (alignment.includes("Good")) {
      return "decoration-text-good/30";
    } else if (alignment.includes("Evil")) {
      return "decoration-text-evil/30";
    } else {
      return "decoration-text-neutral/30";
    }
  });

  const moralBackground = computed(() => {
    const alignment = character.value?.statistics?.alignment?.string || "";
    if (alignment.includes("Good")) {
      return "bg-card-good";
    } else if (alignment.includes("Evil")) {
      return "bg-card-evil";
    } else {
      return "bg-card-neutral";
    }
  });

  const wordsCount = computed(() => {
    let wordsCount = 0;
    wordsCount += getActionsWordsCount(
      character.value?.statistics?.traits || []
    );
    wordsCount += getActionsWordsCount(
      character.value?.statistics?.actions || []
    );
    wordsCount += getActionsWordsCount(
      character.value?.statistics?.bonusActions || []
    );
    wordsCount += getActionsWordsCount(
      character.value?.statistics?.reactions || []
    );
    wordsCount += getActionsWordsCount(
      character.value?.statistics?.legendaryActions || []
    );
    return wordsCount;
  });

  const columns = computed(() => {
    return wordsCount.value > 200 ? 2 : 1;
  });

  function getActionsWordsCount(actions: StatStringArrayWithName[]) {
    let wordsCount = 0;
    actions.forEach((action) => {
      wordsCount += action.string.split(" ").length;
    });
    return wordsCount;
  }

  provide("character", character);
  provide(
    "statistics",
    computed(() => character.value.statistics)
  );
  provide("moral", moral);
  provide("moralDecoration", moralDecoration);
  provide("moralBackground", moralBackground);
  provide("columns", columns);
  provide("wordsCount", wordsCount);
}
