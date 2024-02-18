<template>
  <MonsterStatBlockStat v-if="statistics?.senses?.array?.length">
    <template #title> {{ $t("statBlock.senses") }} </template>
    <MonsterDescription :parts="statistics?.senses?.array || []" tag="span" />
  </MonsterStatBlockStat>
  <MonsterStatBlockStat v-if="statistics?.languages?.array?.length">
    <template #title> {{ $t("statBlock.languages") }} </template>
    <MonsterDescription
      :parts="statistics?.languages?.array || []"
      tag="span"
    />
  </MonsterStatBlockStat>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";
const statistics = inject("statistics") as ComputedRef<Statistics>;
</script>

<style scoped></style>
