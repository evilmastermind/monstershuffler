<template>
  <div class="layout-container">
    <slot name="images" :rules />
    <div class="layout">
      <div v-if="$slots.stats || $slots.card" class="stats">
        <slot name="stats" />
        <div class="card my-4">
          <slot v-if="showRoleplayStats" name="card" />
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
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-areas:
    "story"
    "stats";
  clear: both;
  @apply px-4 pb-4;
}
.stats {
  grid-area: stats;
  @apply mt-6;
}
.story {
  grid-area: story;
}
@media (min-width: 750px) {
  .layout {
    display: flow-root;
  }
  .stats {
    float: right;
    padding-left: 2rem;
    width: 50%;
    @apply mt-0;
  }
}

@media (min-width: theme("screens.sm")) {
  .layout {
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
