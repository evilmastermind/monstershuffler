<template>
  <MonsterStatBlockStat v-if="statistics?.savingThrows?.array?.length">
    <template #title> {{ $t("statBlock.savingThrows") }} </template>
    <MonsterDescription :parts="statistics?.savingThrows?.array || []" />
  </MonsterStatBlockStat>
  <MonsterStatBlockStat v-if="statistics?.skills?.array?.length">
    <template #title> {{ $t("statBlock.skills") }} </template>
    <MonsterDescription :parts="statistics?.skills?.array || []" />
  </MonsterStatBlockStat>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";
const statistics = inject("statistics") as ComputedRef<Statistics>;
</script>

<style scoped></style>
