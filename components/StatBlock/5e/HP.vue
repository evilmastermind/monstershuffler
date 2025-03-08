<template>
  <StatBlockStat>
    <template #title>
      {{ $t("statBlock.hitPoints") }}
    </template>
    <template #default> {{ statistics?.HP.string }} </template>
  </StatBlockStat>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";

const statistics = inject("statistics") as ComputedRef<Statistics>;
</script>

<style scoped></style>
