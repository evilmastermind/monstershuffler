<template>
  <div class="sheet background" :class="background">
    <slot />
  </div>
</template>

<script setup lang="ts">
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
