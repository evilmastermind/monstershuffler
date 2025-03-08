<template>
  <StatBlockStat v-if="statistics?.vulnerabilities?.length">
    <template #title> {{ $t("statBlock.vulnerabilities") }} </template>
    <MonsterJoinedDescription
      :stats="statistics?.vulnerabilities || []"
      tag="span"
    />
  </StatBlockStat>
  <StatBlockStat v-if="statistics?.resistances?.length">
    <template #title> {{ $t("statBlock.resistances") }} </template>
    <MonsterJoinedDescription
      :stats="statistics?.resistances || []"
      tag="span"
    />
  </StatBlockStat>
  <StatBlockStat v-if="statistics?.immunities?.length">
    <template #title> {{ $t("statBlock.immunities") }} </template>
    <MonsterJoinedDescription
      :stats="statistics?.immunities || []"
      tag="span"
    />
  </StatBlockStat>
  <StatBlockStat v-if="statistics?.conditionImmunities?.length">
    <template #title> {{ $t("statBlock.conditionImmunities") }} </template>
    <MonsterJoinedDescription
      :stats="statistics?.conditionImmunities || []"
      tag="span"
    />
  </StatBlockStat>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";
const statistics = inject("statistics") as ComputedRef<Statistics>;
</script>

<style scoped></style>
