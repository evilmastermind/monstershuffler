<template>
  <div class="flex justify-between flex-wrap">
    <StatBlockStat class="mr-2">
      <template #title>
        {{ $t("statBlock.challenge") }}
      </template>
      <template #default>
        <StatBlockCR />
        ({{ statistics.XP }} {{ $t("statBlock.xp") }})
      </template>
    </StatBlockStat>
    <StatBlockStat>
      <template #title> {{ $t("statBlock.proficiencyBonus") }} </template>
      <template #default> {{ addPlusSign(statistics.proficiency) }} </template>
    </StatBlockStat>
  </div>
</template>

<script setup lang="ts">
import { addPlusSign } from "monstershuffler-shared";
import type { Statistics } from "@/types";

const statistics = inject("statistics") as Ref<Statistics>;
</script>

<style scoped></style>
