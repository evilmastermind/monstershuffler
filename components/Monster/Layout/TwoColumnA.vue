<template>
  <div class="layout-container">
    <MonsterImages :rules @load="e('load')" />
    <div class="layout">
      <div class="roleplay">
        <div class="story">
          <slot name="backstory" />
        </div>
        <div class="card class= mt-6">
          <MonsterSheetCard v-if="showRoleplayStats">
            <MonsterRoleplayStats />
          </MonsterSheetCard>
        </div>
      </div>
      <MonsterStatBlock :columns="2" class="mt-6" />
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
  display: block;
  @apply px-4 pb-4;
}
.roleplay {
  columns: 1;
}
@media (min-width: 750px) {
  .roleplay {
    columns: 2;
    column-gap: 2rem;
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
