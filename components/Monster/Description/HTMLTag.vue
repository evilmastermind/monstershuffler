<template>
  <component :is="parts.tag" :class="classes">
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

const classes = computed(() => {
  switch (p.parts.tag) {
    case "ul":
      return "list-disc ml-4";
    case "li":
      return "ml-4";
    default:
      return "";
  }
});
</script>
