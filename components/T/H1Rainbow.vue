<template>
  <h1
    class="gradient-title font-serif font-extrabold text-4xl md:text-6xl tracking-tighter leading-none"
  >
    <slot />
  </h1>
</template>

<script setup lang="ts"></script>

<style scoped>
.gradient-title {
  display: inline-block;
  background: linear-gradient(
    90deg,
    var(--ui-text-toned) 0%,
    var(--ui-text-al-evil) 5%,
    var(--ui-text-al-neutral) 60%,
    var(--ui-text-al-good) 95%,
    var(--ui-text-toned) 100%
  );
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
