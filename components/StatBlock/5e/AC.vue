<template>
  <StatBlockStat>
    <template #title>
      {{ $t("statBlock.armorClass") }}
    </template>
    <MonsterDescription :parts="statistics?.AC?.array || []" tag="span" />
  </StatBlockStat>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";

const statistics = inject("statistics") as ComputedRef<Statistics>;
</script>

<style scoped></style>
