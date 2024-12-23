<template>
  <div class="intro">
    <div class="intro-text text-center mt-6">
      <Transition name="title" appear>
        <h1 class="static custom-title gradient-title">The NPC Generator</h1>
      </Transition>
      <p class="static max-width mt-6">
        Type a prompt above or use the form to create the NPCs you need. You can only use words for the available classes, races, and backgrounds, like these examples:
      </p>
      <ul class="prompt-examples mt-6">
        <li
          v-for="example in examples"
          :key="example"
          class="prompt-example"
          :class="getColors(example)"
          @click="promptFromOtherSources = example"
        >
          {{ example }}
        </li>
      </ul>
      <!-- <p class="static max-width mt-6">
        Create unforgettable NPCs with unique personalities and appearances.
      </p>
      <p class="static max-width mt-2">
        Effortlessly improvise NPCs on the fly, or be inspired by AI-generated
        adventures to add new side quests in your campaign.
      </p> -->
    </div>
  </div>
</template>

<script setup lang="ts">

const generator = useGeneratorStore();

const { promptFromOtherSources } = storeToRefs(generator);
const examples = ref<string[]>([]);
const goodExampleStrings = [
  "lawful good gnome wizard",
  "good half-orc herbalist",
  "good nonbinary druid",
  "good tiefling archer",
];
const evilExampleStrings = [
  "evil rogue cr 6",
  "chaotic evil male innkeeper",
  "evil priest",
  "evil female tank",
];
const neutralEampleStrings = [
  "female human fighter",
  "nonbinary drow bard",
  "cr 6 human guard",
  "lawful dwarf blacksmith",
  "neutral half-orc sorcerer",
];



function getColors(example: string) {
  if (example.includes("evil")) return "text-text-evil border-text-evil bg-card-evil hover:border-evil-600 hover:bg-transparent";
  if (example.includes("good")) return "text-text-good border-text-good bg-card-good hover:border-good-600 hover:bg-transparent";
  if (example.includes("neutral")) return "text-text-neutral border-text-neutral bg-card-neutral hover:border-neutral-600 hover:bg-transparent";
  return "text-text-neutral border-text-neutral bg-card-neutral hover:border-neutral-600 hover:bg-transparent";
}

onMounted(() => {
  examples.value.push(goodExampleStrings.sort(() => Math.random() - 0.5).pop() as string);
  examples.value.push(neutralEampleStrings.sort(() => Math.random() - 0.5).pop() as string);
  examples.value.push(neutralEampleStrings.sort(() => Math.random() - 0.5).pop() as string);
  examples.value.push(evilExampleStrings.sort(() => Math.random() - 0.5).pop() as string);
})

</script>

<style scoped>
.intro {
  position: relative;
  display: grid;
  place-items: center;
}
.intro-text {
  position: relative;
  z-index: 1;
}
.prompt-examples {
  display: grid;
  grid-template-columns: repeat(1, min-content);
  justify-content: center;
  align-items: center;
  @apply gap-2;
}
.prompt-example {
  display: block;
  white-space: nowrap;
  cursor: pointer;
  transition: border-color 0.2s;
  @apply py-1 px-4 border-2 rounded-lg;
}
@media (min-width: theme("screens.sm")) {
  .prompt-examples {
    grid-template-columns: repeat(2, min-content);
  }
}
</style>
