<template>
  <MonsterStatBlockActionType
    v-if="statistics?.reactions?.length"
    type="reactions"
  />
  <MonsterDescription
    v-for="(action, index) in statistics?.reactions"
    :key="index"
    class="action"
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
