<template>
  <div>
    <slot name="images" :rules />
    <div
      class="px-4 pb-4 sm:px-[6%] sm:pb-[6%] grid grid-rows-[auto_auto] md:flow-root"
    >
      <div
        v-if="$slots.stats || $slots.card"
        class="mt-6 md:mt-0 md:float-right md:pl-8 md:w-1/2"
      >
        <slot name="stats" />
        <div
          v-if="showRoleplayStats"
          class="grid place-items-center break-inside-avoid my-4"
        >
          <slot name="card" />
        </div>
      </div>
      <div class="story">
        <slot name="backstory" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ImageRules } from "@/types";

const e = defineEmits(["load"]);
const p = defineProps({
  showRoleplayStats: {
    type: Boolean,
    default: true,
  },
});

const rules: ImageRules = {
  width: "full",
  height: "manual",
  mask: "bottom",
};

e("load");
</script>
