<template>
  <div class="layout">
    <div class="story">
      <slot name="backstory" />
    </div>
    <div class="stats">
      <slot name="stats" :columns="1" />
      <div v-if="showRoleplayStats" class="card my-4">
        <slot v-if="showRoleplayStats" name="card" />
      </div>
    </div>
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
