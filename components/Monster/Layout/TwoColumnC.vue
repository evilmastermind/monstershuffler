<template>
  <div class="layout-container">
    <div class="layout">
      <MonsterImages
        :rules
        class="image"
        @load="e('load')"
        @height="setHeight"
      />
      <div class="roleplay">
        <MonsterBackstory class="story" />
        <div class="card class= mt-6">
          <MonsterSheetCard v-if="showRoleplayStats">
            <MonsterRoleplayStats />
          </MonsterSheetCard>
        </div>
      </div>
    </div>
    <MonsterStatBlock :columns="2" class="stats mt-6" />
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
    width: "full",
    height: "full",
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
}

.roleplay {
  @apply px-4 pt-0;
}
.stats {
  @apply px-4 pb-6;
}

@media (min-width: theme("screens.sm")) {
  .roleplay {
    padding-left: 6%;
    padding-right: 6%;
    padding-top: 0;
  }
  .stats {
    padding-left: 6%;
    padding-right: 6%;
    @apply pb-7;
  }
}

@media (min-width: 750px) {
  .layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  .roleplay {
    padding-top: 12%;
    padding-right: 12%;
  }
  .stats {
    padding-left: 6%;
    padding-right: 6%;
    padding-bottom: 6%;
  }
}

.card {
  display: grid;
  place-items: center;
  break-inside: avoid;
}
</style>
