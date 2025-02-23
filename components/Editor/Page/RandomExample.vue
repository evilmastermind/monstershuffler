<template>
  <div class="random-example">
    <div class="example-prompt static-mono">
      Describe a (crumbling | grand | mysterious) tavern in a fantasy medieval
      (town | city | village).
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.random-example {
  position: relative;
  width: 100px;
  height: 160px;
  @apply bg-background-100 rounded-lg p-2;
}
.random-example .example-prompt {
  font-family: monospace;
  font-size: 0.75rem;
  text-align: left;
  line-height: 1;
  @apply text-text-good;
}
.random-example .example-result {
  font-size: 0.875rem;
  text-align: left;
  line-height: 1.2;
  @apply text-text-evil pt-2;
}
</style>
