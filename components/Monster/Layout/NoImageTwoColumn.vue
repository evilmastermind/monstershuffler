<template>
  <div class="px-2 sm:px-[6%]">
    <div class="columns-1 md:columns-2 md:gap-8">
      <div class="story">
        <slot name="backstory" />
      </div>
      <div
        v-if="showRoleplayStats"
        class="grid place-items-center break-inside-avoid mt-6"
      >
        <slot name="card" />
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
