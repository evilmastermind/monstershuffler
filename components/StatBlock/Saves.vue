<template>
  <StatBlockStat v-if="statistics?.savingThrows?.length">
    <template #title> {{ $t("statBlock.savingThrows") }} </template>
    <MonsterJoinedDescription
      :stats="statistics?.savingThrows || []"
      tag="span"
    />
  </StatBlockStat>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";
const statistics = inject("statistics") as ComputedRef<Statistics>;
</script>

<style scoped></style>
