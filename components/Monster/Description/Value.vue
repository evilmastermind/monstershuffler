<template>
  <template
    v-if="part.translationKey && n !== undefined && part.type === 'valueAsWord'"
  >
    {{
      $t(
        `statBlock.${part.translationKey}`,
        {
          n: numberToWord(n, user.language),
        },
        n
      )
    }}
  </template>
  <template v-else-if="part.translationKey">
    {{
      $t(`statBlock.${part.translationKey}`, part.translationVariables || {}, n)
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
    return parseInt(number);
  } else {
    return 0;
  }
});
</script>

<style scoped></style>
