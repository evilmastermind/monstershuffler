<template>
  <button
    v-tooltip.top="label"
    class="icon-button"
    :disabled
    :style="{
      maxHeight: containerSize ? `${containerSize}px` : 'unset',
    }"
  >
    <Icon
      class="icon"
      aria-hidden
      :name="icon"
      :size
      :style="{
        transform: rotate ? `rotate(${rotate}deg)` : 'none',
      }"
    />
    <span class="sr-only">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
const p = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "16",
  },
  containerSize: {
    type: String,
    default: "",
  },
  rotate: {
    type: Number,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.icon-button {
  display: flex;
  align-items: center;
}
.icon-button:active {
  opacity: 0.8;
}
</style>
