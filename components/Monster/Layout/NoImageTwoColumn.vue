<template>
  <div class="layout">
    <div class="roleplay">
      <div class="story">
        <slot name="backstory" />
      </div>
      <div class="card class= mt-6">
        <slot v-if="showRoleplayStats" name="card" />
      </div>
    </div>
    <div class="mt-6">
      <slot name="stats" :columns="2" />
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
