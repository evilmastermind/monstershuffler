<template>
  <div class="tool-container">
    <PresentationThumbnail>
      <slot name="image" />
    </PresentationThumbnail>
    <div v-if="$slots.default || $slots.title" class="tool-text">
      <h3 v-if="$slots.title" class="static">
        <slot name="title" />
      </h3>
      <p v-if="$slots.default" class="static mt-1">
        <slot name="default" />
      </p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.tool-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  perspective: 1500px;
  @apply gap-6;
}
.tool-text {
  text-align: left;
  max-width: 400px;
}
@media (min-width: theme("screens.md")) {
  .tool-container {
    @apply gap-8;
  }
}
</style>
