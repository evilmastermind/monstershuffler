<template>
  <label
    class="ms-input-style slider-container px-1"
    :class="[size === 'small' ? 'small py-1' : 'medium py-2']"
  >
    <input v-model="model" type="checkbox" class="checkbox" />
    <span class="word unchecked noselect pr-2">{{ unchecked }}</span>
    <span class="word checked noselect pl-2">{{ checked }}</span>
    <div class="slider" />
  </label>
</template>

<script setup>
const model = defineModel({ type: Boolean, required: true });
const p = defineProps({
  checked: {
    type: String,
    required: true,
  },
  unchecked: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "medium",
  },
});
</script>

<style scoped>
/* Hide default HTML checkbox */
.checkbox {
  opacity: 0;
  width: 0;
  height: 0;
}
.medium {
  letter-spacing: 0.05em;
  @apply text-sm;
}
.small {
  letter-spacing: 0.05em;
  @apply text-xs;
}
.slider-container {
  position: relative;
  display: grid;
  grid-template-columns: 0px auto auto;
  line-height: 1rem;
  cursor: pointer;
  z-index: 0;
  line-height: 1.25em;
  @apply gap-0 rounded py-1;
}
.slider-container:hover .slider {
  @apply bg-primary-600;
}
.word {
  position: relative;
  z-index: 1;
  @apply mx-2;
}
.slider {
  position: absolute;
  height: 100%;
  width: 50%;
  left: 0;
  transition: 0.1s ease all, left 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15);
  @apply rounded bg-primary-700;
}
.checked {
  text-align: center;
}
.slider-container .checkbox:checked ~ .slider {
  left: 50%;
}
.unchecked {
  text-align: center;
  @apply text-text-inverse;
}
.slider-container .checkbox:checked ~ .unchecked {
  @apply text-text;
}
.checked {
  text-align: center;
  @apply text-text;
}
.slider-container .checkbox:checked ~ .checked {
  @apply text-text-inverse;
}
</style>
