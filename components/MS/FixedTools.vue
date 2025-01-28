<template>
  <div class="fixed-tools">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.fixed-tools {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  right: 0;
  bottom: 0;
  z-index: 100;
  @apply gap-2 mx-1 mb-2;
}
</style>
