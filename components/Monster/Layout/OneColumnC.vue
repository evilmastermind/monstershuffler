<template>
  <div class="layout-container">
    <div class="layout">
      <div class="story-stats">
        <MonsterBackstory class="story" />
        <div class="stats">
          <MonsterStatBlock />
          <div class="card my-4">
            <MonsterSheetCard v-if="showRoleplayStats">
              <MonsterRoleplayStats />
            </MonsterSheetCard>
          </div>
        </div>
      </div>
      <MonsterImages class="image" :rules @load="e('load')" />
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
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
.story-stats {
  @apply pt-4 px-4;
}
.stats {
  @apply mt-6;
}

@media (min-width: theme("screens.sm")) {
  .story-stats {
    padding-top: 6%;
    padding-left: 6%;
    padding-right: 6%;
    padding-bottom: 0;
  }
}

@media (min-width: 700px) {
  .layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  .story-stats {
    padding-top: 12%;
    padding-left: 12%;
    padding-right: 0;
    padding-bottom: 12%;
  }
}
.card {
  display: grid;
  place-items: center;
  break-inside: avoid;
}
</style>
