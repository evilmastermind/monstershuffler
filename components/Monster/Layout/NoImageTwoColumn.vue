<template>
  <div class="layout">
    <MonsterStatBlock :columns="2" />
    <div class="roleplay mt-6">
      <MonsterBackstory class="story" />
      <div class="card class= mt-6">
        <MonsterSheetCard v-if="showRoleplayStats">
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
