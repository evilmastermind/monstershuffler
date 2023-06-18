<template>
  <div class="card shadow-xl p-5">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.card {
  background: theme("colors.background");
  backdrop-filter: blur(4px);
}
</style>
