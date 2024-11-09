<template>
  <div class="roadmap-container">
    <ul class="roadmap p-4">
      <slot />
    </ul>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.roadmap-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.roadmap {
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: theme("screens.nav");
  @apply gap-1;
}
</style>
