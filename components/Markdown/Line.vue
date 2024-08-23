<template>
  <p ref="lineRef">{{ line }}</p>
</template>

<script setup lang="ts">
import { useMutationObserver } from "@vueuse/core";

const line = defineModel({ type: String });
const lineRef = ref(null);
</script>

<style scoped></style>
