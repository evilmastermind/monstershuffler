<template>
  <component :is="parts.tag">
    <slot />
    <template v-for="(part, index) in parts.parts" :key="index">
      <MonsterDescriptionHTMLTag v-if="'tag' in part" :parts="part" />
      <MonsterDescriptionPart v-else-if="part.string" :part="part" />
    </template>
  </component>
</template>

<script setup lang="ts">
import type { PartsInHTMLTag } from "@/types";

const p = defineProps({
  parts: {
    type: Object as PropType<PartsInHTMLTag>,
    required: true,
  },
});
</script>

<style scoped></style>
