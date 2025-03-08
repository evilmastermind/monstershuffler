<template>
  <p class="my-0 stat">
    <em class="title" :class="moral">
      <slot name="title" />
    </em>
    <span>&nbsp;</span>
    <slot />
  </p>
</template>

<script setup lang="ts">
const moral = inject("moral") as string;
</script>

<style scoped>
.stat {
  line-height: 1.5em;
}
.title {
  font-weight: bold;
  font-style: normal;
}
</style>
