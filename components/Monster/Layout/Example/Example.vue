<template>
  <button
    class="flex cursor-pointer bg-(--ui-text-muted) hover:outline-2 hover:outline-primary h-[90px] sm:h-[126px] p-1 rounded-lg gap-1"
    :class="selected ? 'outline-2 outline-primary' : ''"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const p = defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>
