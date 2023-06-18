<template>
  <div class="card shadow-md p-5">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.card {
  background-color: theme("colors.background");
}
</style>
