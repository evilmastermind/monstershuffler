<template>
  <span class="description">
    <template v-for="(part, i) in p.parts" :key="i">
      <!-- Tooltips -->
      <span
        v-if="part.type === 'background'"
        class="dotted"
        :class="part?.format || []"
      >
        <MSTooltip :id="part.id" :word="part.string" source="backgrounds" />
      </span>
      <span
        v-else-if="part.type === 'class'"
        class="text-textlight"
        :class="part?.format || []"
      >
        {{ part.string }}
      </span>
      <!-- rollable parts -->
      <span
        v-else-if="part?.type && ['value', 'valueAsWord'].includes(part?.type)"
      >
        <MonsterDescriptionValue :part="part" />
      </span>
      <!-- resource -->
      <span v-else-if="part.type === 'resource'" :class="part?.format || []">
        <MonsterDescriptionResource :part="part" />
      </span>
      <!-- Units of measurement -->
      <span
        v-else-if="
          part?.type &&
          ['feet', 'ft', 'range/rangeMax', 'range', 'reach'].includes(
            part?.type
          )
        "
      >
        <MonsterDescriptionUnit :part="part" />
      </span>
      <!-- Translatable & Non-Translatable Text -->
      <span v-else :class="part?.format || []">
        <MonsterDescriptionText :part="part" />
      </span>
    </template>
    <template v-if="period && !hasPeriod">.</template>
    <template v-if="colon && !hasColon">:</template>
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
  colon: {
    type: Boolean,
    default: false,
  },
});

const hasPeriod = computed(() => {
  const last = p.parts[p.parts.length - 1];
  return last?.string?.trim().endsWith(".");
});
const hasColon = computed(() => {
  const last = p.parts[p.parts.length - 1];
  return last?.string?.trim().endsWith(":");
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
