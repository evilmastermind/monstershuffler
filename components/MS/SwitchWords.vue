<template>
  <label class="slider-container px-1">
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
});
</script>

<style lang="scss" scoped>
/* Hide default HTML checkbox */
.checkbox {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider-container {
  cursor: pointer;
  position: relative;
  display: grid;
  grid-template-columns: 0px 1fr 1fr;
  border-radius: 1rem;
  line-height: 1rem;
  overflow: hidden;
  background-color: theme("colors.background-inset.400");
  border-top: 1px solid theme("colors.background-inset.700");
  border-left: 1px solid theme("colors.background-inset.700");
  border-right: 1px solid theme("colors.background-inset.700");
  border-bottom: 1px solid theme("colors.background-inset.600");
  box-shadow: inset 0px 6px 5px theme("colors.background-inset.500");
  @apply gap-2  py-1;
}
.slider-container:hover .slider {
  @apply bg-primary-600;
}
.word {
  z-index: 1;
  letter-spacing: 0.05em;
  @apply text-sm;
}
.slider {
  position: absolute;
  height: 100%;
  width: 50%;
  left: 0;
  border-radius: 1rem;
  transition: 0.1s ease all, left 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15);
  @apply bg-primary-700;
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
