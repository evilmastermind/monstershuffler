<template>
  <div
    class="sheet background"
    :class="[background, rounded ? 'rounded' : '', hasShadow ? 'shadow' : '']"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const p = defineProps({
  rounded: {
    type: Boolean,
    default: false,
  },
  hasShadow: {
    type: Boolean,
    default: false,
  },
});
const ui = useUiStore();

const background = computed(() => {
  switch (ui.currentThemeType) {
    case "light":
      return "background-light";
    case "dark":
      return "background-dark";
  }
});
</script>

<style scoped>
.background {
  position: relative;
  overflow: hidden;
}
.background-light {
  background-image: url("@/public/images/monster/paper.webp");
  @apply bg-background-200;
}
.background-dark {
  background-image: url("@/public/images/monster/paper-dark.webp");
  @apply bg-background-200;
}
</style>
