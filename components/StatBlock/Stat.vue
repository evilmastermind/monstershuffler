<template>
  <p class="my-0 leading-[1.5em]">
    <em class="font-bold not-italic" :class="moral">
      <slot name="title" />
    </em>
    <span>&nbsp;</span>
    <slot />
  </p>
</template>

<script setup lang="ts">
const moral = inject("moral") as string;
</script>

<style scoped></style>
