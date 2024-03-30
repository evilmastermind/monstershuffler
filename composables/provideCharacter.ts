import type { Character } from "@/types";

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

  provide("character", character);
  provide(
    "statistics",
    computed(() => character.value.statistics)
  );
  provide("moral", moral);
  provide("moralDecoration", moralDecoration);
  provide("moralBackground", moralBackground);
}
