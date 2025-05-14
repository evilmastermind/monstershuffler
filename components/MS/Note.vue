<template>
  <div class="background" :class="background">
    <slot />
  </div>
</template>

<script setup lang="ts">
const ui = useUiStore();

const background = computed(() => {
  if (ui.isDark) {
    return "background-dark";
  } else {
    return "background-light";
  }
});
</script>

<style scoped>
.background {
  overflow: hidden;
}
.background-light {
  background-image: url("@/public/images/monster/paper.webp");
}
.background-dark {
  background-image: url("@/public/images/monster/paper-dark.webp");
}
</style>
