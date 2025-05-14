<template>
  <TDotted v-if="part.type === 'background'" :class="part?.format || []">
    <MSTooltip
      :id="part.id"
      :word="part.string"
      :description="character?.character?.background?.description"
      source="backgrounds"
    />
  </TDotted>
  <span
    v-else-if="part.type === 'class'"
    class="text-textlight"
    :class="part?.format || []"
  >
    {{ part.string }}
  </span>
  <MonsterSpellName v-else-if="part.type === 'spell'" :part="part" />
  <MonsterDescriptionDiceRoll
    v-else-if="part.type && ['d20Roll', 'diceRoll'].includes(part.type)"
    :part="part"
  />
  <MonsterDescriptionValue
    v-else-if="part?.type && ['value', 'valueAsWord'].includes(part?.type)"
    :part="part"
  />
  <MonsterDescriptionResource
    v-else-if="part.type === 'resource'"
    :class="part?.format || []"
    :part="part"
  />
  <MonsterDescriptionUnit
    v-else-if="
      part?.type &&
      ['feet', 'ft', 'range/rangeMax', 'range', 'reach'].includes(part?.type)
    "
    :part="part"
  />
  <span v-else-if="part?.format?.length" :class="part?.format">
    <MonsterDescriptionText :part="part" />
  </span>
  <MonsterDescriptionText v-else :part="part" />
</template>

<script setup lang="ts">
import type { Character, DescriptionPart } from "@/types";

const character = inject("character") as Ref<Character>;

const p = defineProps({
  part: {
    type: Object as PropType<DescriptionPart>,
    required: true,
  },
});
</script>

<style scoped></style>
