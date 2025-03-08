<template>
  <StatBlockStat>
    <template #title>
      {{ $t("statBlock.HP") }}
    </template>
    <template #default>
      <span>{{ statistics?.HP.string }} </span>
    </template>
  </StatBlockStat>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";

const statistics = inject("statistics") as ComputedRef<Statistics>;
const moral = inject("moral") as string;
</script>

<style scoped></style>
