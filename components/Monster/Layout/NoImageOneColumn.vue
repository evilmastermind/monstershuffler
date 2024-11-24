<template>
  <div class="layout">
    <div class="story">
      <slot name="backstory" />
    </div>
    <div class="stats">
      <MonsterStatBlock />
      <div v-if="showRoleplayStats" class="card my-4">
        <MonsterSheetCard>
          <MonsterRoleplayStats />
        </MonsterSheetCard>
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
  @apply px-2;
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
    padding: 6%;
  }
}

.card {
  display: grid;
  place-items: center;
  break-inside: avoid;
}
</style>
