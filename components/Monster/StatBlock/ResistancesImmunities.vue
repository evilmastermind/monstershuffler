<template>
  <MonsterStatBlockStat v-if="statistics?.vulnerabilities?.array?.length">
    <template #title> {{ $t("statBlock.vulnerabilities") }} </template>
    <MonsterDescription
      :parts="statistics?.vulnerabilities?.array || []"
      tag="span"
    />
  </MonsterStatBlockStat>
  <MonsterStatBlockStat v-if="statistics?.resistances?.array?.length">
    <template #title> {{ $t("statBlock.resistances") }} </template>
    <MonsterDescription
      :parts="statistics?.resistances?.array || []"
      tag="span"
    />
  </MonsterStatBlockStat>
  <MonsterStatBlockStat v-if="statistics?.immunities?.array?.length">
    <template #title> {{ $t("statBlock.immunities") }} </template>
    <MonsterDescription
      :parts="statistics?.immunities?.array || []"
      tag="span"
    />
  </MonsterStatBlockStat>
  <MonsterStatBlockStat v-if="statistics?.conditionImmunities?.array?.length">
    <template #title> {{ $t("statBlock.conditionImmunities") }} </template>
    <MonsterDescription
      :parts="statistics?.conditionImmunities?.array || []"
      tag="span"
    />
  </MonsterStatBlockStat>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";
const statistics = inject("statistics") as ComputedRef<Statistics>;
</script>

<style scoped></style>
