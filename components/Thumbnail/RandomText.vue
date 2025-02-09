<template>
  <PresentationThumbnail>
    <div class="random-example">
      <div class="example-prompt static-mono">
        A (loyal | faithful | false) (priest | paladin | servant) of Deity.
      </div>
      <Transition name="fade" mode="out-in">
        <div :key="exampleResult" class="example-result">
          {{ exampleResult }}
        </div>
      </Transition>
    </div>
  </PresentationThumbnail>
</template>

<script setup lang="ts">
const exampleResult = ref("A faithful paladin of Mystra.");
let interval: NodeJS.Timeout | null = null;

const exampleResults = [
  "A faithful servant of Lathander.",
  "A false priest of Bane.",
  "A loyal paladin of Asmodeus.",
  "A loyal servant of Torm.",
  "A faithful paladin of Mystra.",
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
  @apply bg-background-100 rounded-lg p-1;
}
.random-example .example-prompt {
  font-family: monospace;
  font-size: 0.73rem;
  text-align: left;
  line-height: 1;
  @apply text-text-good;
}
.random-example .example-result {
  font-size: 0.8rem;
  text-align: left;
  line-height: 1.2;
  @apply text-text-evil pt-1;
}
</style>
