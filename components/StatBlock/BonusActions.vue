<template>
  <StatBlockActionType
    v-if="statistics?.bonusActions?.length"
    type="bonusActions"
  />
  <MonsterDescription
    v-for="(action, index) in statistics?.bonusActions"
    :key="index"
    class="my-2 leading-6"
    :parts="action.array"
    :name="action.nameArray"
    period
  />
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";
const statistics = inject("statistics") as ComputedRef<Statistics>;
</script>

<style scoped></style>
