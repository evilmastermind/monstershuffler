<template>
  <div>
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div
        class="pt-4 px-4 sm:pt-[6%] sm:px-[6%] md:pt-[12%] md:pl-[12%] md:pr-0 md:pb-[12%]"
      >
        <div class="story">
          <slot name="backstory" />
        </div>
        <div class="mt-6">
          <slot name="stats" :columns="1" />
          <div
            v-if="showRoleplayStats"
            class="grid place-items-center break-inside-avoid my-4"
          >
            <slot name="card" />
          </div>
        </div>
      </div>
      <slot name="images" :rules />
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
  height: "full",
  mask: "left",
};

e("load");
</script>
