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
      <MonsterImages class="image" />
    </div>
  </div>
</template>

<script setup lang="ts">
const p = defineProps({
  showRoleplayStats: {
    type: Boolean,
    default: true,
  },
});
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
@media (min-width: 850px) {
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

@media (min-width: theme("screens.sm")) {
  .layout {
  }
}

.card {
  display: grid;
  place-items: center;
  break-inside: avoid;
}
</style>
