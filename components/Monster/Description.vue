<template>
  <q class="description">
    <template v-for="(part, i) in p.characterHook" :key="i">
      <span v-if="!part.type"> {{ part.string }} </span>
      <b v-else-if="part.type === 'background'" class="dotted">
        <MSTooltip :id="part.id" :word="part.string" source="backgrounds" />
      </b>
      <span v-else class="inline-block">{{ part.string }}</span>
      <template v-if="i < p.characterHook.length - 1">&nbsp;</template>
      <template v-else>.</template>
    </template>
  </q>
</template>

<script setup lang="ts">
import type { DescriptionPart } from "@/types";

const p = defineProps({
  characterHook: {
    type: Object as PropType<DescriptionPart[]>,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.description {
  @apply italic max-w-full block whitespace-normal break-normal;
}
.dotted {
  border-bottom: 1px dotted theme("colors.text-secondary");
  cursor: help;
}
</style>
