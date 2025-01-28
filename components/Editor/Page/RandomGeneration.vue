<template>
  <div class="random-example">
    <div class="example-result">
      <TransitionGroup name="fade-row">
        <span v-for="word in generationPartial" :key="word">
          {{ `${word} ` }}
        </span>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
const generation = ref<string[]>([
  "Nestled",
  "at",
  "the",
  "end",
  "of",
  "a",
  "crooked",
  "alley",
  "in",
  "the",
  "heart",
  "of",
  "a",
  "bustling",
  "medieval",
  "town,",
  "the",
  "Shadowed",
  "Spire",
  "Tavern",
  "exudes",
  "an",
  "air",
  "of",
  "mystery",
  "that",
  "both",
  "intrigues...",
]);

const generationPartial = ref<string[]>([]);
let interval: NodeJS.Timeout | null = null;

onMounted(() => {
  interval = setInterval(() => {
    if (generationPartial.value.length >= generation.value.length) {
      generationPartial.value = [];
    }
    generationPartial.value.push(
      generation.value[generationPartial.value.length]
    );
  }, 150);
});

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});
</script>

<style scoped>
.random-example {
  position: relative;
  width: 100px;
  height: 160px;
  @apply bg-background-100 rounded-lg p-2;
}
.random-example .example-prompt {
  font-family: monospace;
  font-size: 0.75rem;
  text-align: left;
  line-height: 1;
  @apply text-text-good;
}
.random-example .example-result {
  font-size: 0.875rem;
  text-align: left;
  line-height: 1.2;
  font-style: italic;
  @apply text-text-neutral pt-2;
}
</style>
