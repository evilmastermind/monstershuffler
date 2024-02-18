<template>
  <span>
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

<style scoped></style>
