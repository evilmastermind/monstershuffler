<template>
  <div class="layout">
    <MonsterStatBlock :force-one-column />
    <div class="roleplay mt-6">
      <MonsterBackstory class="story" />
      <div class="card class= mt-6">
        <MonsterSheetCard>
          <MonsterRoleplayStats />
        </MonsterSheetCard>
      </div>
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
  @apply px-2;
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
    padding: 6%;
  }
}

.card {
  display: grid;
  place-items: center;
  break-inside: avoid;
}
</style>
