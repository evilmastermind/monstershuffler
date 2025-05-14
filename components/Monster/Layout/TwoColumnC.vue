<template>
  <div>
    <div ref="layout" class="grid grid-cols-1 md:grid-cols-2 md:gap-8">
      <MonsterImages
        :rules="rules"
        class="image w-min h-min"
        @load="e('load')"
        @height="setHeight"
      />
      <div class="px-4 pt-0 sm:px-6 md:pt-[12%] md:pr-[12%]">
        <div class="story">
          <slot name="backstory" />
        </div>
        <div
          v-if="showRoleplayStats"
          class="grid place-items-center break-inside-avoid mt-6"
        >
          <slot name="card" />
        </div>
      </div>
    </div>
    <div class="px-4 pb-6 sm:px-6 sm:pb-7 md:px-[6%] md:pb-[6%] mt-6">
      <slot name="stats" :columns="2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ImageRules } from "@/types";
import { IMG_MAX_CANVAS_WIDTH } from "@/utils";

const e = defineEmits(["load"]);
const p = defineProps({
  showRoleplayStats: { type: Boolean, default: true },
});

const imageHeight = ref(500);
const width = ref(IMG_MAX_CANVAS_WIDTH);
const layout = ref<HTMLElement | null>(null);

const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    width.value = (entry.target as HTMLElement).clientWidth;
  }
});

const rules: ComputedRef<ImageRules> = computed(() => ({
  width: "manual",
  height: "manual",
  maxWidth: width.value,
  mask: "bottom-right",
}));

function setHeight(height: number) {
  imageHeight.value = height;
}

watch(layout, () => {
  if (layout.value) observer.observe(layout.value);
});

onUnmounted(() => {
  if (layout.value) observer.unobserve(layout.value);
});
</script>
