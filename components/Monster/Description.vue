<template>
  <span class="description">
    <template v-for="(part, i) in p.parts" :key="i">
      <b v-if="part.type === 'background'" class="dotted">
        <MSTooltip :id="part.id" :word="part.string" source="backgrounds" />
      </b>
      <b v-else-if="part.type === 'class'" class="text-textlight">{{
        part.string
      }}</b>
      <template v-else>{{ part.string }}</template>
    </template>
    <template v-if="period && !hasPeriod">.</template>
  </span>
</template>

<script setup lang="ts">
import type { DescriptionPart } from "@/types";

const p = defineProps({
  parts: {
    type: Object as PropType<DescriptionPart[]>,
    required: true,
  },
  period: {
    type: Boolean,
    default: false,
  },
});

const hasPeriod = computed(() => {
  const last = p.parts[p.parts.length - 1];
  return last?.string?.trim().endsWith(".");
});
</script>

<style scoped lang="scss">
.description {
  @apply whitespace-normal break-normal;
}
.dotted {
  border-bottom: 1px dotted theme("colors.text-secondary");
  cursor: help;
}
</style>
