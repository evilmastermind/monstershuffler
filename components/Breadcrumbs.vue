<template>
  <div class="breadcrumbs mt-5">
    <h1 class="page-title">
      <slot />
    </h1>
    <div class="options">
      <slot name="options" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.breadcrumbs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
.options {
  display: flex;
  gap: 1rem;
}
.page-title {
  font-family: "MrsEavesSmallCaps", serif;
  font-weight: bold;
  letter-spacing: 0.1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  @apply text-lg text-text-evil;
}
</style>
