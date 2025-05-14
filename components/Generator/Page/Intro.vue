<template>
  <div class="relative text-center z-10 flex flex-col items-center">
    <Transition name="title" appear>
      <TH1>The NPC Generator</TH1>
    </Transition>
    <TP class="max-w-2xl mt-6">
      Type a prompt above or use the form to create the NPCs you need. You can
      only use words for the available classes, races, and backgrounds, like
      these examples:
    </TP>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6">
      <UButton
        v-for="example in examples"
        :key="example"
        block
        color="neutral"
        variant="subtle"
        @click="promptFromOtherSources = example"
      >
        {{ example }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const generator = useGeneratorStore();

const { promptFromOtherSources } = storeToRefs(generator);
const examples = ref<string[]>([]);
const goodExampleStrings = [
  "lawful good gnome guard",
  "good half-orc herbalist",
  "good nonbinary innkeeper",
  "good archer blacksmith",
];
const evilExampleStrings = [
  "nonbinary evil rogue",
  "chaotic evil male druid",
  "evil priest",
  "evil female tank",
];
const neutralExampleStrings = [
  "cr 3 tiefling fighter",
  "cr 1/2 drow bard",
  "cr 6 halfling wizard",
  "cr 10 lawful cleric",
  "cr 5 sorcerer",
];

function getColors(example: string) {
  if (example.includes("evil"))
    return "text-(--ui-text-al-evil) border-(--ui-al-evil) bg-(--ui-bg-al-evil)/70 hover:bg-transparent";
  if (example.includes("good"))
    return "text-(--ui-text-al-good) border-(--ui-al-good) bg-(--ui-bg-al-good)/70 hover:bg-transparent";
  else
    return "text-(--ui-text-al-neutral) border-(--ui-al-neutral) bg-(--ui-bg-al-neutral)/70 hover:bg-transparent";
}

onMounted(() => {
  examples.value.push(
    goodExampleStrings.sort(() => Math.random() - 0.5).pop() as string,
  );
  examples.value.push(
    ...neutralExampleStrings.sort(() => Math.random() - 0.5).slice(0, 2),
  );
  examples.value.push(
    evilExampleStrings.sort(() => Math.random() - 0.5).pop() as string,
  );
});
</script>

<style scoped></style>
