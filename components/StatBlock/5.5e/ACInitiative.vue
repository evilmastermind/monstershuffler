<template>
  <div class="grid grid-cols-2 w-full">
    <StatBlockStat>
      <template #title>
        {{ $t("statBlock.AC") }}
      </template>
      <MonsterDescription :parts="statistics.AC.array || []" tag="span" />
    </StatBlockStat>
    <StatBlockStat>
      <template #title>
        {{ $t("statBlock.initiative") }}
      </template>
      <MonsterDescription
        :parts="statistics.abilities.DEX.modifier.array || []"
        tag="span"
      />
      ({{ Math.ceil(10.5 + statistics.abilities.DEX.modifier.number) }})
    </StatBlockStat>
  </div>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";

const statistics = inject("statistics") as ComputedRef<Statistics>;
const moral = inject("moral") as string;
</script>

<style scoped></style>
