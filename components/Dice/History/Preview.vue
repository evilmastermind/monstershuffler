<template>
  <div
    class="font-[ScalaSansOffc] backdrop-blur-sm shadow-xl p-1 ml-2 rounded bg-muted"
  >
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
</script>

<style scoped></style>
