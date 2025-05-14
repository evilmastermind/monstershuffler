import type {
  GeneratorCharacter,
  Character,
  Statistics,
  StatStringArrayWithName,
} from "@/types";

export function useProvideCharacter(
  generatorCharacter: Ref<GeneratorCharacter>,
) {
  const character = ref<Character>();
  const statistics = ref<Statistics>();
  const didLayoutShift = ref(false);

  const moral = computed(() => {
    const alignment =
      generatorCharacter.value.object?.statistics?.alignment?.string || "";
    if (alignment.includes("Good")) {
      return "text-(--ui-text-al-good) fill-(--ui-al-good) border-(--ui-al-good)/70 decoration-(--ui-al-good)";
    } else if (alignment.includes("Evil")) {
      return "text-(--ui-text-al-evil) fill-(--ui-al-evil) border--(--ui-al-evil)/70 decoration-(--ui-al-evil)";
    } else {
      return "text-(--ui-text-al-neutral) fill-(--ui-al-neutral) border-(--ui-al-neutral)/70 decoration-(--ui-al-neutral)";
    }
  });

  const moralDecoration = computed(() => {
    const alignment =
      generatorCharacter.value.object?.statistics?.alignment?.string || "";
    if (alignment.includes("Good")) {
      return "underline decoration-wavy decoration-[1px] decoration-skip-ink decoration-al-good/20";
    } else if (alignment.includes("Evil")) {
      return "underline decoration-wavy decoration-[1px] decoration-skip-ink decoration-al-evil/20";
    } else {
      return "underline decoration-wavy decoration-[1px] decoration-skip-ink decoration-al-neutral/20";
    }
  });

  const moralBackground = computed(() => {
    const alignment =
      generatorCharacter.value.object?.statistics?.alignment?.string || "";
    if (alignment.includes("Good")) {
      return "bg-(--ui-bg-al-good)";
    } else if (alignment.includes("Evil")) {
      return "bg-(--ui-bg-al-evil)";
    } else {
      return "bg-(--ui-bg-al-neutral)";
    }
  });

  const wordsCount = computed(() => {
    /**
     * (this is just a dumb way to force reactivity, since character object is marked
     * as non-reactive with markRaw for performance reasons)
     */
    let wordsCount =
      generatorCharacter.value.key - generatorCharacter.value.key;
    // count words in actions
    wordsCount += getActionsWordsCount(
      generatorCharacter.value.object?.statistics?.traits || [],
    );
    wordsCount += getActionsWordsCount(
      generatorCharacter.value.object?.statistics?.actions || [],
    );
    wordsCount += getActionsWordsCount(
      generatorCharacter.value.object?.statistics?.bonusActions || [],
    );
    wordsCount += getActionsWordsCount(
      generatorCharacter.value.object?.statistics?.reactions || [],
    );
    wordsCount += getActionsWordsCount(
      generatorCharacter.value.object?.statistics?.legendaryActions || [],
    );
    return wordsCount;
  });

  const columns = computed((previous: number | undefined) => {
    const newColumns = wordsCount.value > 200 ? 2 : 1;
    if (previous && previous !== newColumns) {
      didLayoutShift.value = true;
    } else {
      didLayoutShift.value = false;
    }
    return newColumns;
  });

  function getActionsWordsCount(actions: StatStringArrayWithName[]) {
    let wordsCount = 0;
    actions.forEach((action) => {
      wordsCount += action.string.split(" ").length;
    });
    return wordsCount;
  }

  watch(
    character,
    () => {
      character.value = markRaw(generatorCharacter.value.object);
      statistics.value = generatorCharacter.value.object.statistics
        ? markRaw(generatorCharacter.value.object.statistics)
        : undefined;
    },
    { immediate: true },
  );

  provide("character", character);
  provide("statistics", statistics);
  provide("wrapper", generatorCharacter);
  provide("moral", moral);
  provide("moralDecoration", moralDecoration);
  provide("moralBackground", moralBackground);
  provide("columns", columns);
  provide("wordsCount", wordsCount);
  provide("didLayoutShift", didLayoutShift);

  return {
    character,
    statistics,
    moral,
    moralDecoration,
    moralBackground,
    columns,
    wordsCount,
    didLayoutShift,
  };
}
