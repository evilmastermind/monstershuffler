<template>
  <svg
    class="separator mt-3 mb-3"
    :class="moral"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1500 14"
  >
    <path fill-opacity="1" d="M 0 0 L 1500 7 L 0 14 L 0 0"></path>
  </svg>
</template>

<script setup lang="ts">
const moral = inject("moral") as string;
</script>

<style scoped>
.separator {
  max-width: 100%;
  line-height: 24px;
}
</style>
