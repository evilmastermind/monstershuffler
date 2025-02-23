<template>
  <div class="separator">
    <div class="separator-line" />
    <div class="fancy-icon">
      <Icon :name="icon" class="text-background-400 text-2xl" />
    </div>
    <div class="separator-line" />
  </div>
</template>

<script setup lang="ts">
const p = defineProps({
  icon: {
    type: String,
    default: "fa-solid:dice-d20",
  },
});
</script>

<style scoped>
.separator {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  @apply gap-1;
}
.separator-line {
  width: 100px;
  height: 5px;
  @apply border-b-[2px] border-b-background-300;
}
@media (min-width: theme("screens.md")) {
  .separator-line {
    width: 200px;
  }
}
</style>
