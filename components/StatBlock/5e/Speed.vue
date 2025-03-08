<template>
  <StatBlockStat v-if="statistics?.speeds?.length">
    <template #title> {{ $t("statBlock.speed.speed") }} </template>
    <MonsterJoinedDescription :stats="statistics?.speeds || []" tag="span" />
  </StatBlockStat>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";

const statistics = inject("statistics") as ComputedRef<Statistics>;
</script>

<style scoped></style>
