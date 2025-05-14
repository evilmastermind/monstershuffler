<template>
  <svg
    viewBox="0 0 830 917"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :width="size * 10"
    :height="size * 11"
    class="overflow-visible"
    :class="shadow ? 'shadow' : ''"
  >
    <path
      d="M414.5 6L6 210.5L24 677.5L414.5 910.5L806.5 677.5L824.5 210.5L414.5 6Z"
      class="fill-(--ui-text-inverted) stroke-(--ui-text-muted)"
      :stroke-width="stroke * 10"
    />
    <path
      d="M415.5 7.5V102M415.5 102L8 211L147.5 575.5M415.5 102L821.5 211L683.5 575.5M415.5 102L147.5 575.5M415.5 102L683.5 575.5M147.5 575.5H683.5M147.5 575.5L415.5 907.5L683.5 575.5M147.5 575.5L25.5 677M683.5 575.5L805 677"
      class="stroke-(--ui-text-muted)"
      :stroke-width="stroke * 5"
    />
  </svg>
</template>

<script setup lang="ts">
const ui = useUiStore();

const p = defineProps({
  size: {
    type: Number,
    default: 5,
  },
  stroke: {
    type: Number,
    default: 1,
  },
  invert: {
    type: Boolean,
    default: false,
  },
  shadow: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.shadow {
  filter: drop-shadow(2px 2px 2px rgb(0 0 0 / 0.3));
}
</style>
