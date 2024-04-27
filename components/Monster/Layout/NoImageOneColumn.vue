<template>
  <div class="layout">
    <MonsterBackstory class="story" />
    <div class="stats">
      <MonsterStatBlock />
      <div class="card my-4">
        <MonsterSheetCard>
          <MonsterRoleplayStats />
        </MonsterSheetCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
