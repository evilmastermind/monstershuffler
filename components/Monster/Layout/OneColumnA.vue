<template>
  <div class="layout-container">
    <MonsterImages />
    <div class="layout">
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
  @apply px-4 pb-4;
}
@media (min-width: 750px) {
  .layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
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
