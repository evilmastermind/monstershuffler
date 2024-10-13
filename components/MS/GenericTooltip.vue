<template>
  <span
    class="tooltip-span cursor-help"
    @mouseenter="handleMouseOver"
    @mouseleave="isVisible = false"
    @click.stop="handleClick"
    @touchstart.stop="handleClick"
  >
    <slot name="default" />
  </span>
  <div
    v-if="isVisible"
    class="tooltip-container"
    :style="{
      top: topValue,
      left: `${left}px`,
      width: `${width}px`,
    }"
  >
    <div ref="container" class="tooltip">
      <slot name="tooltip" />

      <MSIconButton
        v-if="hasCloseButton"
        class="close-button"
        :label="$t('closeLabel')"
        icon="fa6-solid:xmark"
        @click.stop="isVisible = false"
        @touchstart.stop="isVisible = false"
      />
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
const container = ref<HTMLElement | null>(null);
const topValue = ref("auto");

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

watch(
  [y, x],
  () => {
    if (!container.value) {
      return;
    }
    const containerRect = container.value.getBoundingClientRect();
    if (y.value - containerRect.height < 0) {
      topValue.value = `${y.value + containerRect.height + 10}px`;
    } else {
      topValue.value = `${y.value - 2}px`;
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.tooltip-span {
  display: grid;
  place-items: center;
}
.tooltip-container {
  position: fixed;
  z-index: 9990;
}
.tooltip {
  position: absolute;
  bottom: 0%;
  width: 100%;
  white-space: normal;
  @apply text-text shadow-xl rounded p-4 sm:p-5 bg-background-100 not-italic;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem;
  cursor: pointer;
}
</style>
