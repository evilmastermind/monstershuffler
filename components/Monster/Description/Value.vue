<template>
  <span v-if="part?.translationKey?.includes('rollable')">
    <MonsterDescriptionDice :part="part" />
  </span>
  <span v-else>
    {{ $t(`statBlock.${part.translationKey}`, translationVariables || {}) }}
  </span>
</template>

<script setup lang="ts">
import type { DescriptionPart } from "@/types";
import { numberToWord } from "@/parsers";
const p = defineProps({
  part: {
    type: Object as PropType<DescriptionPart>,
    required: true,
  },
});

const translationVariables = computed(() => {
  const variables = p.part?.translationVariables || {};
  if (p.part?.type === "valueAsWord" && "value" in variables) {
    variables.value = numberToWord(parseInt(variables.value) || 0);
  }
  return variables;
});
</script>

<style scoped></style>
