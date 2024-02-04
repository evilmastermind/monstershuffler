<template>
  <MonsterStatBlockActionType
    v-if="statistics?.legendaryActions?.length"
    type="legendaryActions"
  />
  <MonsterDescription
    v-if="statistics?.legendaryActions?.length"
    :parts="statistics?.legendaryActionsIntro?.array || []"
    period
  />
  <p
    v-for="(action, index) in statistics?.legendaryActions"
    :key="index"
    class="action"
  >
    <MonsterDescription
      class="font-bold mr-1"
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
