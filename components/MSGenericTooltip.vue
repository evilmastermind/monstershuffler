<template>
  <span
    class="dotted"
    @mouseenter="handleMouseOver"
    @mouseleave="isVisible = false"
    @click.stop="handleClick"
  >
    <slot name="default" />
  </span>
  <div
    v-if="isVisible"
    class="tooltip-container"
    :style="{ top: `${y - 2}px`, left: `${left}px`, width: `${width}px` }"
  >
    <div class="tooltip">
      <slot name="tooltip" />
      <div
        v-if="hasCloseButton"
        class="close-button"
        @click.stop="isVisible = false"
      >
        <font-awesome-icon icon="fas fa-solid fa-xmark" />
      </div>
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

function handleClick() {
  isVisible.value = true;
  hasCloseButton.value = true;
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
  @apply shadow-xl rounded p-4 sm:p-5 bg-background not-italic;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem;
  cursor: pointer;
}
</style>
