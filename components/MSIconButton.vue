<template>
  <button class="icon-button" :title="label">
    <Icon class="icon" aria-hidden :name="icon" :size />
    <span class="sr-only">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
const p = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "16",
  },
});
</script>

<style scoped>
.icon-button {
  display: grid;
  place-items: center;
}
</style>
