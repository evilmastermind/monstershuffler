<template>
  <div class="text">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
