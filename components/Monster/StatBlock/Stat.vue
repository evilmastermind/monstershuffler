<template>
  <p class="my-0">
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
.title {
  font-weight: bold;
  font-style: normal;
}
</style>
