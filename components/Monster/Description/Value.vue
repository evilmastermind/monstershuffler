<template>
  <MonsterDescriptionDice v-if="part.type === 'diceRoll'" :part="part" />
  <MonsterDescriptionD20 v-else-if="part.type === 'd20Roll'" :part="part" />
  <template
    v-else-if="
      part.translationKey && n !== undefined && part.type === 'valueAsWord'
    "
  >
    {{
      $t(
        `statBlock.${part.translationKey}`,
        {
          n: numberToWord(n, user.language),
        },
        parseInt(n)
      )
    }}
  </template>
  <template v-else-if="part.translationKey">
    {{
      $t(`statBlock.${part.translationKey}`, part.translationVariables || {})
    }}
  </template>
  <template v-else>
    {{ part?.string }}
  </template>
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

const user = useUserStore();

const n = computed(() => {
  const number = p.part?.translationVariables?.n;
  if (number !== undefined) {
    return number;
  } else {
    return undefined;
  }
});
</script>

<style scoped></style>
