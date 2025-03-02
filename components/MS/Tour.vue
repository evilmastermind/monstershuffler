<template>
  <VTooltip :placement :triggers="['click', 'hover']" delay="0">
    <div class="tour rounded">
      <slot name="default" />
    </div>
    <template #popper>
      <h4 v-if="title" class="title">
        {{ title }}
      </h4>
      <p class="description">
        {{ description }}
      </p>
    </template>
  </VTooltip>
</template>

<script setup lang="ts">
const p = defineProps({
  placement: {
    type: String,
    default: "top",
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.tour:hover {
  position: relative;
  /* outline: 10000px solid rgba(0, 0, 0, 0.05); */
  z-index: 1000;
  height: 100%;
  @apply outline-[3px] outline outline-text-evil;
}
.title {
  font-weight: bold;
  @apply text-sm;
}
.description {
  max-width: 300px;
  @apply text-sm;
}
</style>
