<template>
  <span>
    <span
      v-if="roll.resultsByType?.length > 1 || roll.d20Roll"
      :class="specialRoll"
    >
      {{ roll.totalResult }}
    </span>
    <template v-if="roll.resultsByType?.length > 1"> (</template
    ><template v-if="roll.d20Roll === undefined"
      ><template v-for="(result, index) in roll.resultsByType" :key="index"
        ><span v-if="index > 0">&nbsp;{{ $t("statBlock.plus") }}&nbsp;</span
        >{{ result.result }} {{ result.type }}
      </template>
    </template>
    <template v-if="roll.resultsByType?.length > 1">)</template>
  </span>
</template>

<script setup lang="ts">
import type { DiceRoll } from "@/types";

const p = defineProps({
  roll: {
    type: Object as PropType<DiceRoll>,
    required: true,
  },
});

const specialRoll = computed(() => {
  switch (p.roll.d20Roll) {
    case 20:
      return "text-success font-bold";
    case 1:
      return "text-danger font-bold";
  }
  return "";
});
</script>

<style scoped></style>
