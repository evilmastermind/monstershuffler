<template>
  <div
    class="grid grid-cols-1 gap-8 px-4 py-4 sm:px-[6%] sm:py-[5%] md:grid-cols-2"
  >
    <div class="story">
      <slot name="backstory" />
    </div>
    <div class="stats">
      <slot name="stats" :columns="1" />
      <div
        v-if="showRoleplayStats"
        class="grid place-items-center break-inside-avoid my-4"
      >
        <slot name="card" />
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
