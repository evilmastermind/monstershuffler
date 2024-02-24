<template>
  <span class="dice">
    {{ part.string }}
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

<style scoped>
.dice {
  border-bottom: 1px solid rgba(125, 125, 125, 0.3);
}
.dice:hover {
  cursor: pointer;
}
</style>
