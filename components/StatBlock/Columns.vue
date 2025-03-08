<template>
  <div :class="`columns-${columnsCount}`">
    <slot />
  </div>
</template>

<script setup lang="ts">
// todo: stat-block-content class belongs somewhere else (parent components?)
// todo: bring columns-x classes here
const p = defineProps({
  columnsCount: {
    type: Number,
    default: 1,
  },
});
</script>

<style scoped>
.columns-2 {
  columns: 2;
  column-gap: 2rem;
}
@container (max-width: 500px) {
  .columns-2 {
    columns: 1;
  }
}
</style>
