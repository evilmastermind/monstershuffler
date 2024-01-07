<template>
  <MonsterStatBlockActionType
    v-if="statistics?.bonusActions?.length"
    type="bonusActions"
  />
  <p
    v-for="(action, index) in statistics?.bonusActions"
    :key="index"
    class="action"
  >
    <MonsterDescription
      class="font-bold italic mr-1"
      :parts="action.nameArray"
      period
    />
    <MonsterDescription :parts="action.array" period />
  </p>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";
const statistics = inject("statistics") as ComputedRef<Statistics>;
</script>

<style scoped></style>
