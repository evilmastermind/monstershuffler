<template>
  <p v-for="(trait, index) in statistics?.traits" :key="index" class="action">
    <MonsterDescription
      class="font-bold italic mr-1"
      :parts="trait.nameArray"
      period
    />
    <MonsterDescription :parts="trait.array" period />
  </p>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";
const statistics = inject("statistics") as ComputedRef<Statistics>;
</script>

<style scoped></style>
