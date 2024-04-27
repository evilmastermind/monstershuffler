<template>
  <div class="layout-container">
    <MonsterImages />
    <div class="layout">
      <div class="roleplay">
        <MonsterBackstory class="story" />
        <div class="card class= mt-6">
          <MonsterSheetCard>
            <MonsterRoleplayStats />
          </MonsterSheetCard>
        </div>
      </div>
      <MonsterStatBlock :force-one-column class="mt-6" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { width: screenWidth } = useScreen();

const forceOneColumn = computed(() => screenWidth.value < 930);
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
