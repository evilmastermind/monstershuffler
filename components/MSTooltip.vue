<template>
  <span
    class="dotted"
    @mouseover="handleMouseOver"
    @mouseleave="isVisible = false"
    @click.stop="handleClick"
  >
    {{ word }}
  </span>
  <div
    v-if="isVisible"
    class="tooltip-container"
    :style="{ top: `${y - 2}px`, left: `${left}px`, width: `${width}px` }"
  >
    <div class="tooltip">
      <h4 class="text-left">{{ word }}:</h4>
      <p v-if="description !== null" class="content">{{ description }}</p>
      <LoadingDots v-else :size="6" />
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
import { useTooltipsStore } from "@/stores/tooltips";
import { useMouse } from "@/composables/mouse";
import { useScreen } from "@/composables/screen";

const { x, y } = useMouse();
const { width: screenWidth } = useScreen();
const tooltips = useTooltipsStore();

const p = defineProps({
  word: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    default: null,
  },
  source: {
    type: String,
    required: true,
  },
});

const isVisible = ref(false);
const hasCloseButton = ref(false);
const description: Ref<string | null> = ref("");

const width = computed(() => {
  if (screenWidth.value < 400) {
    return screenWidth.value;
  }
  return 400;
});
const left = computed(() => {
  if (x.value + width.value / 2 > screenWidth.value) {
    return screenWidth.value - width.value;
  } else if (x.value - width.value / 2 < 0) {
    return 0;
  }
  return x.value - width.value / 2;
});

function handleClick() {
  isVisible.value = true;
  hasCloseButton.value = true;
}

function handleMouseOver() {
  isVisible.value = true;
  hasCloseButton.value = false;
}

watch(isVisible, async (newValue) => {
  if (newValue && description.value === "") {
    description.value = await tooltips.getDescription(
      p?.id?.toString() || p.word,
      p.source
    );
  }
});
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
