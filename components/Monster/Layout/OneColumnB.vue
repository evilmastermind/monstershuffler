<template>
  <div class="layout-container">
    <MonsterImages />
    <div class="layout">
      <div class="stats">
        <MonsterStatBlock />
        <div class="card my-4">
          <MonsterSheetCard>
            <MonsterRoleplayStats />
          </MonsterSheetCard>
        </div>
      </div>
      <MonsterBackstory class="story" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
