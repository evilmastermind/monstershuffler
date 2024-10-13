<template>
  <div class="range-container">
    <label class="range-label">
      <span v-if="label" class="ms-label"> {{ label }}</span
      >: {{ value }}<span class="range-unit ml-[2px]">{{ `${unit}` }}</span>
      <input v-model="value" type="range" :min :max :step class="slider" />
    </label>
    <div v-if="false" class="range-limits">
      <span class="range-value range-min">{{ min }}</span>
      <span class="range-value range-max">{{ max }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const value = defineModel({ type: Number, required: true });

const p = defineProps({
  label: {
    type: String,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    default: "",
  },
  step: {
    type: Number,
    default: 1,
  },
});
</script>

<style scoped>
.range-container {
  --thumb-height: 20px;
  --thumb-radius: 50%;
}
.range-limits {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.range-value {
  @apply text-xs text-text-2;
}
.range-unit {
  @apply text-xs text-text-2;
}
.range-min {
  text-align: left;
}
.range-max {
  text-align: right;
}
.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 2px;
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  @apply bg-grey-300;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: var(--thumb-height, 20px);
  height: var(--thumb-height, 20px);
  cursor: pointer;
  border-radius: var(--thumb-radius, 50%);
  @apply bg-primary-700 shadow;
}

.slider::-moz-range-thumb {
  width: var(--thumb-height, 20px);
  height: var(--thumb-height, 20px);
  cursor: pointer;
  border-radius: var(--thumb-radius, 50%);
  @apply bg-primary-700 shadow;
}
</style>
