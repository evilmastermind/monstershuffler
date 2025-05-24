<template>
  <a
    :href
    class="font-medium underline decoration-2 decoration-(--ui-text-muted)"
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
const p = defineProps({
  href: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
