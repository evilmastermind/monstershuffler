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
.page-title {
  font-family: "OpenSans", sans-serif;
  font-weight: 700;
  letter-spacing: -0.05em;
  white-space: nowrap;
  text-overflow: ellipsis;
  @apply text-lg text-text-evil;
}
.options {
  display: flex;
  gap: 1rem;
}
</style>
