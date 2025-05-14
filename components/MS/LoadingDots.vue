<template>
  <div
    class="flex gap-4 justify-center items-center"
    :style="{ fontSize: `${size}px` }"
  >
    <div :class="[dotsCount > 0 ? 'bg-(--ui-text-muted)' : '', 'w-4 h-4']" />
    <div :class="[dotsCount > 1 ? 'bg-(--ui-text-muted)' : '', 'w-4 h-4']" />
    <div :class="[dotsCount > 2 ? 'bg-(--ui-text-muted)' : '', 'w-4 h-4']" />
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
