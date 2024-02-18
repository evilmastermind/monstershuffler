<template>
  <MonsterDescription
    v-for="(action, index) in statistics?.traits"
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
