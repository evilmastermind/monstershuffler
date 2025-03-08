<template>
  <StatBlockStat v-if="statistics?.skills?.length">
    <template #title> {{ $t("statBlock.skills") }} </template>
    <MonsterJoinedDescription :stats="statistics?.skills || []" tag="span" />
  </StatBlockStat>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";
const statistics = inject("statistics") as ComputedRef<Statistics>;
</script>

<style scoped></style>
