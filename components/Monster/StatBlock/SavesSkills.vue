<template>
  <MonsterStatBlockStat v-if="statistics?.savingThrows?.length">
    <template #title> {{ $t("statBlock.savingThrows") }} </template>
    <MonsterJoinedDescription
      :stats="statistics?.savingThrows || []"
      tag="span"
    />
  </MonsterStatBlockStat>
  <MonsterStatBlockStat v-if="statistics?.skills?.length">
    <template #title> {{ $t("statBlock.skills") }} </template>
    <MonsterJoinedDescription :stats="statistics?.skills || []" tag="span" />
  </MonsterStatBlockStat>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";
const statistics = inject("statistics") as ComputedRef<Statistics>;
</script>

<style scoped></style>
