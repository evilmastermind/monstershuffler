<template>
  <div class="random-example">
    <Transition name="fade-slow" mode="out-in" appear>
      <div
        v-if="exampleResult.length"
        :key="exampleResult"
        class="example-result"
      >
        {{ exampleResult }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const exampleResult = ref(
  "Describe a grand tavern in a fantasy medieval city."
);
let interval: NodeJS.Timeout | null = null;

const exampleResults = [
  "Describe a mysterious tavern in a fantasy medieval town.",
  "Describe a crumbling tavern in a fantasy medieval village.",
];
const exampleIndex = ref(0);

onMounted(() => {
  interval = setInterval(() => {
    exampleResult.value =
      exampleResults[exampleIndex.value++ % exampleResults.length];
  }, 3000);
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
  @apply text-text-evil pt-2;
}
</style>
