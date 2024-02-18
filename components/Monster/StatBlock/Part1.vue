<template>
  <MonsterStatBlockStat>
    <template #title> {{ $t("statBlock.AC") }} </template>
    <MonsterDescription :parts="statistics?.AC?.array || []" tag="span" />
  </MonsterStatBlockStat>
  <MonsterStatBlockStat>
    <template #title> {{ $t("statBlock.HP") }} </template>
    <template #default> {{ statistics?.HP.string }} </template>
  </MonsterStatBlockStat>
  <MonsterStatBlockStat v-if="statistics?.speeds?.string">
    <template #title> {{ $t("statBlock.speed.speed") }} </template>
    <MonsterDescription :parts="statistics?.speeds?.array || []" tag="span" />
  </MonsterStatBlockStat>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";

const statistics = inject("statistics") as ComputedRef<Statistics>;
</script>

<style scoped></style>
