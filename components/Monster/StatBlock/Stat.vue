<template>
  <p class="my-0 stat">
    <em class="title mr-1" :class="moral">
      <slot name="title" />
    </em>
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
