<template>
  <div class="lds-ring" :style="containerSize">
    <div :style="innerSize" :class="`color-${computedColor}`"></div>
    <div :style="innerSize" :class="`color-${computedColor}`"></div>
    <div :style="innerSize" :class="`color-${computedColor}`"></div>
    <div :style="innerSize" :class="`color-${computedColor}`"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { UIColors } from "@/types";

const p = defineProps({
  size: {
    type: Number,
    default: 5,
  },
  color: {
    type: String as PropType<UIColors>,
    default: "primary",
  },
  background: {
    type: String as PropType<UIColors>,
    default: "",
  },
});

const computedColor = computed(() => {
  if (
    p.background &&
    ["primary", "complementary", "dark"].includes(p.background)
  ) {
    return "dark";
  } else if (p.background) {
    return "light";
  }
  return p.color;
});

const containerSize = computed(() => {
  return [`width: ${p.size}rem`, `height: ${p.size}rem`];
});
const innerSize = computed(() => {
  return [
    `width: ${p.size * 0.8}rem`,
    `height: ${p.size * 0.8}rem`,
    `margin: ${p.size * 0.1}rem`,
    `border-width: ${p.size * 0.1}rem`,
  ];
});
</script>

<style lang="scss" scoped>
// LOADING SPINNER
.lds-ring {
  display: block;
  position: relative;
  margin: 0 auto;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  border-style: solid;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.color-primary {
  @apply border-t-primary-700 border-r-transparent border-b-transparent border-l-transparent;
}
.color-complementary {
  @apply border-t-complementary-700 border-r-transparent border-b-transparent border-l-transparent;
}

.color-light {
  @apply border-t-text border-r-transparent border-b-transparent border-l-transparent;
}

.color-dark {
  @apply border-t-text-inverse border-r-transparent border-b-transparent border-l-transparent;
}
.color-patreon {
  border-color: hsl(240, 0%, 3%) transparent transparent transparent;
}
</style>
