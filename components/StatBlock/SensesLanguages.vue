<template>
  <StatBlockStat v-if="statistics?.senses?.length">
    <template #title> {{ $t("statBlock.senses") }} </template>
    <MonsterJoinedDescription :stats="statistics?.senses || []" tag="span" />
  </StatBlockStat>
  <StatBlockStat v-if="statistics?.languages?.length">
    <template #title> {{ $t("statBlock.languages") }} </template>
    <MonsterJoinedDescription :stats="statistics?.languages || []" tag="span" />
  </StatBlockStat>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";
const statistics = inject("statistics") as ComputedRef<Statistics>;
</script>

<style scoped></style>
