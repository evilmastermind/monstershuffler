<template>
  <template v-if="part?.translationKey">
    {{
      $t(`statBlock.${part?.translationKey}`, part?.translationVariables || {})
    }}
  </template>
  <template v-else-if="part?.type === 'translatableText'">
    {{ translation }}
  </template>
  <template v-else-if="part?.type === 'tag'">
    {{ tagTranslation }}
  </template>
  <template v-else-if="part?.type === 'numberAsWord'">
    {{ numberAsWord }}
  </template>
  <template v-else-if="part?.type === 'ordinal'">
    {{ ordinal }}
  </template>
  <template v-else-if="part?.type && part?.type !== 'text'">
    {{ translatedStat }}
  </template>
  <template v-else>{{ part.string }}</template>
</template>

<script setup lang="ts">
import type { DescriptionPart } from "@/types";
import { numberToWord, addOrdinal } from "@/parsers";

const { t, te } = useI18n();
const user = useUserStore();

const p = defineProps({
  part: {
    type: Object as PropType<DescriptionPart>,
    required: true,
  },
});

const language = computed(() => user.me?.settings?.language || "en");
const tagTranslation = computed(() => {
  if (p.part?.type === "tag") {
    if (te(`statBlock.${p.part.string}`)) {
      return t(`statBlock.${p.part.string}`);
    }
  }
  return p.part?.string;
});
const numberAsWord = computed(() => {
  if (language.value === "en") {
    return p.part?.string;
  } else {
    return numberToWord(p.part?.number || 0, language.value);
  }
});
const ordinal = computed(() => {
  if (language.value === "en") {
    return p.part?.string;
  } else {
    return addOrdinal(p.part?.number || 0, language.value);
  }
});
const translation = computed(() => {
  if (te(`statBlock.${p.part?.string}`)) {
    return t(`statBlock.${p.part?.string}`);
  }
  return p.part?.string;
});
const translatedStat = computed(() => {
  if (te(`statBlock.${p.part?.type}.${p.part?.string}`)) {
    return t(`statBlock.${p.part?.type}.${p.part?.string}`);
  }
  return p.part?.string;
});
</script>

<style scoped></style>
