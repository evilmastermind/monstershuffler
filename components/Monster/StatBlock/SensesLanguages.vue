<template>
  <MonsterStatBlockStat v-if="statistics?.senses?.array?.length">
    <template #title> {{ $t("statBlock.senses") }} </template>
    <MonsterStatBlockDescription :parts="statistics?.senses?.array || []" />
  </MonsterStatBlockStat>
  <MonsterStatBlockStat v-if="statistics?.languages?.array?.length">
    <template #title> {{ $t("statBlock.languages") }} </template>
    <MonsterStatBlockDescription :parts="statistics?.languages?.array || []" />
  </MonsterStatBlockStat>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";
const statistics = inject("statistics") as ComputedRef<Statistics>;
</script>

<style scoped></style>
