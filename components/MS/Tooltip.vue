<template>
  <TDotted
    @mouseover="handleMouseOver"
    @mouseleave="isVisible = false"
    @click.stop="handleClick"
  >
    {{ word }}
  </TDotted>
  <div
    v-if="isVisible"
    class="tooltip-container"
    :style="{ top: `${y - 2}px`, left: `${left}px`, width: `${width}px` }"
  >
    <div
      class="absolute bottom-0 w-full ring ring-accented rounded-md p-4 sm:p-5 bg-default not-italic shadow-xl"
    >
      <h4 class="text-left font-bold">{{ word }}:</h4>
      <p v-if="retrievedDescription !== null" class="content">
        {{ retrievedDescription }}
      </p>
      <MSLoadingDots v-else :size="6" />
      <MSClose v-if="hasCloseButton" @click.stop="isVisible = false" />
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
  description: {
    type: String,
    default: "",
  },
});

const isVisible = ref(false);
const hasCloseButton = ref(false);
const retrievedDescription: Ref<string | null> = ref(null);

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
  if (newValue && !p.description && retrievedDescription.value === null) {
    retrievedDescription.value = await tooltips.getDescription(
      p?.id?.toString() || p.word,
      p.source,
    );
  } else if (p.description) {
    retrievedDescription.value = p.description;
  }
});
</script>

<style scoped>
.tooltip-container {
  position: fixed;
  z-index: 9990;
}
</style>
