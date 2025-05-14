<template>
  <div>
    <slot name="images" :rules />
    <div class="px-4 pb-4 sm:px-[6%] sm:pb-[6%]">
      <slot name="stats" :columns="2" />
      <div class="columns-1 md:columns-2 md:gap-8 mt-6">
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
