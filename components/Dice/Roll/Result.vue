<template>
  <div class="result" :class="fontSize">
    {{ roll.totalResult }}
  </div>
</template>

<script setup lang="ts">
import type { DiceRoll } from "@/stores";

const rolls = useRollsStore();

const p = defineProps({
  roll: {
    type: Object as PropType<DiceRoll>,
    required: true,
  },
});

const fontSize = computed(() => {
  if (p.roll.totalResult < 99) {
    return "text-2xl";
  }
  return "text-xl";
});
</script>

<style scoped>
.result {
  font-family: "AdLib", Arial, Helvetica, sans-serif;
  color: black;
}
</style>
