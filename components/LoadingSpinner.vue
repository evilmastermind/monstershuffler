<template>
  <div class="lds-ring" :style="containerSize">
    <div :style="innerSize" :class="`color-${color}`"></div>
    <div :style="innerSize" :class="`color-${color}`"></div>
    <div :style="innerSize" :class="`color-${color}`"></div>
    <div :style="innerSize" :class="`color-${color}`"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const p = defineProps({
  size: {
    type: Number,
    default: 5,
  },
  color: {
    type: String,
    default: "primary",
  },
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
  border-color: theme("colors.primary[700]") transparent transparent transparent;
}
.color-complementary {
  border-color: theme("colors.primary[700]") transparent transparent transparent;
}

.color-light {
  border-color: theme("colors.text") transparent transparent transparent;
}

.color-dark {
  border-color: theme("colors.text-inverse") transparent transparent transparent;
}
.color-patreon {
  border-color: hsl(240, 0%, 3%) transparent transparent transparent;
}
</style>
