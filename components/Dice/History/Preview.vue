<template>
  <div class="roll-preview">
    <b class="font-bold">{{ roll.monster || $t("dice.you") }}</b>
    <span v-if="roll.rollName"> ({{ roll.rollName }})</span>:
    <DiceHistoryResult :roll />
  </div>
</template>

<script setup lang="ts">
import type { DiceRoll } from "@/types";

const p = defineProps({
  roll: {
    type: Object as PropType<DiceRoll>,
    required: true,
  },
});

onMounted(() => {
  console.log("yo I be mounted");
});
</script>

<style scoped>
.roll-preview {
  backdrop-filter: blur(4px);
  font-family: ScalaSansOffc;
  @apply shadow-xl p-1 ml-2 rounded bg-background-50;
}
</style>
