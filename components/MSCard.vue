<template>
  <div class="card">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.card {
  backdrop-filter: blur(4px);
  @apply shadow-xl rounded p-4 sm:p-5 bg-background-100;
}
</style>
