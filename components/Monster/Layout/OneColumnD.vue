<template>
  <div ref="layout" class="layout-container">
    <div class="layout padding-bottom">
      <div>
        <MonsterImages
          :rules
          class="image"
          @load="e('load')"
          @height="setHeight"
        />
        <div
          class="story padding-left"
          :style="{
            paddingTop: `${imageHeight}`,
          }"
        >
          <slot name="backstory" />
        </div>
      </div>
      <div class="stats">
        <MonsterStatBlock />
        <div class="card my-4">
          <MonsterSheetCard v-if="showRoleplayStats">
            <MonsterRoleplayStats />
          </MonsterSheetCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ImageRules } from "@/types";
import { IMG_MAX_CANVAS_WIDTH } from "@/utils";

const e = defineEmits(["load"]);
const p = defineProps({
  showRoleplayStats: {
    type: Boolean,
    default: true,
  },
});

const imageHeight = ref(500);
const width = ref(IMG_MAX_CANVAS_WIDTH);
const layout = ref<HTMLElement | null>(null);

const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { clientWidth } = entry.target as HTMLElement;
    width.value = clientWidth;
  }
});

const rules: ComputedRef<ImageRules> = computed(() => {
  return {
    width: "manual",
    height: "manual",
    maxWidth: width.value,
    mask: "bottom-right",
  };
});

function setHeight(height: number) {
  imageHeight.value = height;
}

watch(layout, () => {
  if (layout.value) {
    observer.observe(layout.value);
  }
});

onUnmounted(() => {
  if (layout.value) {
    observer.unobserve(layout.value);
  }
});
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
.stats {
  @apply px-4 pt-4;
}
.story {
  @apply pr-4;
}
.padding-right {
  @apply pr-4;
}
.padding-left {
  @apply pl-4;
}
.padding-top {
  @apply pt-4;
}
.padding-bottom {
  @apply pb-4;
}

@media (min-width: theme("screens.sm")) {
  .padding-right {
    padding-right: 12%;
  }
  .padding-left {
    padding-left: 12%;
  }
  .padding-bottom {
    padding-bottom: 6%;
  }
  .padding-top {
    padding-top: 12%;
  }
  .stats {
    padding-top: 6%;
    padding-right: 6%;
    padding-left: 6%;
  }
  .story {
    padding-right: 6%;
    padding-left: 6%;
  }
}

@media (min-width: 750px) {
  .layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  .story {
    padding-right: 0;
    padding-left: 12%;
  }
}

.card {
  display: grid;
  place-items: center;
  break-inside: avoid;
}

.image {
  position: absolute;
  top: 0px;
  left: 0px;
}
</style>
