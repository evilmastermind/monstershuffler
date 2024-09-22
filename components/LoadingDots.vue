<template>
  <div class="loading-spinner" :style="{ fontSize: `${size}px` }">
    <div :class="dotsCount > 0 ? 'bg-text-secondary' : ''" />
    <div :class="dotsCount > 1 ? 'bg-text-secondary' : ''" />
    <div :class="dotsCount > 2 ? 'bg-text-secondary' : ''" />
  </div>
</template>

<script setup lang="ts">
const p = defineProps({
  size: {
    type: Number,
    default: 5,
  },
});

const dotsCount = ref(1);
const dotsInterval = setInterval(dots, 500);

function dots() {
  if (dotsCount.value < 3) {
    dotsCount.value += 1;
  } else {
    dotsCount.value = 0;
  }
}

onUnmounted(() => {
  clearInterval(dotsInterval);
});
</script>

<style scoped>
.loading-spinner {
  display: flex;
  gap: 1em;
  justify-content: center;
  align-items: center;
}
.loading-spinner div {
  width: 1em;
  height: 1em;
}
</style>
