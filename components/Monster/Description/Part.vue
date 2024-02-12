<template>
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
  <MonsterSpellName v-else-if="part.type === 'spell'" :part="part" />
  <span v-else-if="part?.type && ['value', 'valueAsWord'].includes(part?.type)">
    <MonsterDescriptionValue :part="part" />
  </span>
  <span v-else-if="part.type === 'resource'" :class="part?.format || []">
    <MonsterDescriptionResource :part="part" />
  </span>
  <span
    v-else-if="
      part?.type &&
      ['feet', 'ft', 'range/rangeMax', 'range', 'reach'].includes(part?.type)
    "
  >
    <MonsterDescriptionUnit :part="part" />
  </span>
  <span v-else :class="part?.format || []">
    <MonsterDescriptionText :part="part" />
  </span>
</template>

<script setup lang="ts">
import type { DescriptionPart } from "@/types";

const p = defineProps({
  part: {
    type: Object as PropType<DescriptionPart>,
    required: true,
  },
});
</script>

<style scoped lang="scss"></style>
