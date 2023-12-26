<template>
  <span class="description">
    <template v-for="(part, index) of parts" :key="index">
      {{ part.string }}
    </template>
  </span>
</template>

<script setup lang="ts">
import { DescriptionPart } from "@/types";

const { t, te } = useI18n();

const p = defineProps({
  parts: {
    type: Array as PropType<DescriptionPart[]>,
    required: true,
  },
});
</script>

<style scoped></style>
