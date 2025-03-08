<template>
  <StatBlockActionType
    v-if="statistics?.actions?.length || statistics?.spells?.length"
    type="actions"
  />
  <MonsterDescription
    v-for="(action, index) in statistics?.actions"
    :key="index"
    class="action"
    :parts="action.array"
    :name="action.nameArray"
    period
  />
  <p v-if="statistics?.spells?.length" class="action">
    <span class="font-bold italic"> {{ $t("statBlock.spellcasting") }}. </span>
    <MonsterDescription tag="span" :parts="statistics.spellcasting!" />
  </p>
  <MonsterDescription
    v-for="(action, index) in statistics?.spells"
    :key="index"
    class="spell-group"
    :parts="action.array"
    :name="action.nameArray"
  />
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";
const statistics = inject("statistics") as ComputedRef<Statistics>;
</script>

<style scoped></style>
