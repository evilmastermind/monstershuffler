<template>
  <MonsterStatBlockStat>
    <template #title> {{ $t("statBlock.AC") }} </template>
    <template #default> {{ statistics?.AC.string }} </template>
  </MonsterStatBlockStat>
  <MonsterStatBlockStat>
    <template #title> {{ $t("statBlock.HP") }} </template>
    <template #default> {{ statistics?.HP.string }} </template>
  </MonsterStatBlockStat>
  <MonsterStatBlockStat v-if="statistics?.speeds?.string">
    <template #title> {{ $t("statBlock.speed.speed") }} </template>
    <template #default> {{ statistics.speeds.string }} </template>
  </MonsterStatBlockStat>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";
const user = useUserStore();

const statistics = inject("statistics") as Statistics;
</script>

<style scoped></style>
