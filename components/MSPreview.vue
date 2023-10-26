<template>
  <span
    class="dotted"
    @mouseenter="handleMouseOver"
    @mouseleave="isVisible = false"
  >
    <slot name="default" />
  </span>
  <div
    v-if="isVisible"
    class="tooltip-container"
    :style="{ top: `${y - 2}px`, left: `${left}px`, width: `${width}px` }"
  >
    <div class="tooltip">
      <slot name="preview" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { x, y } = useMouse();
const { width: screenWidth } = useScreen();

const p = defineProps({
  maxWidth: {
    type: Number,
    default: 500,
  },
});

const isVisible = ref(false);
const hasCloseButton = ref(false);

const width = computed(() => {
  if (screenWidth.value < p.maxWidth) {
    return screenWidth.value;
  }
  return p.maxWidth;
});
const left = computed(() => {
  if (x.value + width.value / 2 > screenWidth.value) {
    return screenWidth.value - width.value;
  } else if (x.value - width.value / 2 < 0) {
    return 0;
  }
  return x.value - width.value / 2;
});

function handleMouseOver() {
  isVisible.value = true;
  hasCloseButton.value = false;
}
</script>

<style scoped lang="scss">
.tooltip-container {
  position: fixed;
  z-index: 9990;
}
.tooltip {
  position: absolute;
  bottom: 0%;
  width: 100%;
}
.close-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem;
  cursor: pointer;
}
</style>
