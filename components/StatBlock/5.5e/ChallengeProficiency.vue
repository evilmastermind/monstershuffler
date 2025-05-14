<template>
  <div>
    <StatBlockStat class="mr-2">
      <template #title>
        {{ $t("statBlock.cr") }}
      </template>
      <template #default>
        <StatBlockCR />
        ({{ $t("statBlock.xp") }} {{ statistics.XP }}; {{ $t("statBlock.pb") }}
        {{ addPlusSign(statistics.proficiency) }})
      </template>
    </StatBlockStat>
  </div>
</template>

<script setup lang="ts">
import { addPlusSign } from "monstershuffler-shared";
import type { Statistics } from "@/types";

const statistics = inject("statistics") as Ref<Statistics>;
</script>

<style scoped></style>
