<template>
  <div class="layout-container">
    <MonsterImages :rules @load="e('load')" />
    <div class="layout">
      <div class="stats">
        <MonsterStatBlock />
        <div class="card my-4">
          <MonsterSheetCard v-if="showRoleplayStats">
            <MonsterRoleplayStats />
          </MonsterSheetCard>
        </div>
      </div>
      <MonsterBackstory class="story" />
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
  gap: 2rem;
  @apply px-4 pb-4;
}
.stats {
  grid-area: stats;
}
.story {
  grid-area: story;
}
@media (min-width: 750px) {
  .layout {
    display: block;
  }
  .stats {
    float: left;
    padding-right: 2rem;
    min-width: 50%;
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
