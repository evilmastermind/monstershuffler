<template>
  <MonsterStatBlockStat v-if="statistics?.senses?.length">
    <template #title> {{ $t("statBlock.senses") }} </template>
    <MonsterJoinedDescription :stats="statistics?.senses || []" tag="span" />
  </MonsterStatBlockStat>
  <MonsterStatBlockStat v-if="statistics?.languages?.length">
    <template #title> {{ $t("statBlock.languages") }} </template>
    <MonsterJoinedDescription :stats="statistics?.languages || []" tag="span" />
  </MonsterStatBlockStat>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";
const statistics = inject("statistics") as ComputedRef<Statistics>;
</script>

<style scoped></style>
