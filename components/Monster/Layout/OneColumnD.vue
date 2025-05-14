<template>
  <div ref="layout">
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 pb-4 sm:pb-[6%]">
      <div>
        <MonsterImages
          :rules="rules"
          class="absolute w-min top-0 left-0"
          @load="e('load')"
          @height="setHeight"
        />
        <div
          class="pl-4 pr-4 pt-[var(--image-height)] sm:pl-[6%] sm:pr-[6%] sm:pt-[6%] md:pl-[12%]"
        >
          <slot name="backstory" />
        </div>
      </div>
      <div class="px-4 pt-4 sm:px-[6%] sm:pt-[6%]">
        <slot name="stats" :columns="1" />
        <div
          v-if="showRoleplayStats"
          class="grid place-items-center break-inside-avoid my-4"
        >
          <slot name="card" />
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
