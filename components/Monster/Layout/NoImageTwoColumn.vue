<template>
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
</template>

<script setup lang="ts">
const e = defineEmits(["load"]);
const p = defineProps({
  showRoleplayStats: {
    type: Boolean,
    default: true,
  },
});

e("load");
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
