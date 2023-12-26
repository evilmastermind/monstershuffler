<template>
  <MonsterStatBlockStat v-if="statistics?.vulnerabilities?.array?.length">
    <template #title> {{ $t("statBlock.vulnerabilities") }} </template>
    <MonsterStatBlockDescription
      :parts="statistics?.vulnerabilities?.array || []"
    />
  </MonsterStatBlockStat>
  <MonsterStatBlockStat v-if="statistics?.resistances?.array?.length">
    <template #title> {{ $t("statBlock.resistances") }} </template>
    <MonsterStatBlockDescription
      :parts="statistics?.resistances?.array || []"
    />
  </MonsterStatBlockStat>
  <MonsterStatBlockStat v-if="statistics?.immunities?.array?.length">
    <template #title> {{ $t("statBlock.immunities") }} </template>
    <MonsterStatBlockDescription :parts="statistics?.immunities?.array || []" />
  </MonsterStatBlockStat>
  <MonsterStatBlockStat v-if="statistics?.conditionImmunities?.array?.length">
    <template #title> {{ $t("statBlock.conditionImmunities") }} </template>
    <MonsterStatBlockDescription
      :parts="statistics?.conditionImmunities?.array || []"
    />
  </MonsterStatBlockStat>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";
const statistics = inject("statistics") as ComputedRef<Statistics>;
</script>

<style scoped></style>
