<template>
  <div class="menu-list">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
/* Menu List */
.menu-list {
  display: flex;
  flex-direction: column;
  overflow: visible;
  @apply gap-1;
}
</style>
