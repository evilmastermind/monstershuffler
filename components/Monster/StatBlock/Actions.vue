<template>
  <MonsterStatBlockActionType
    v-if="statistics?.actions?.length || statistics?.spells?.length"
    type="actions"
  />
  <p v-for="(action, index) in statistics?.actions" :key="index" class="action">
    <MonsterDescription
      class="font-bold italic"
      :parts="action.nameArray"
      period
    />&nbsp;<MonsterDescription :parts="action.array" period />
  </p>
  <p v-if="statistics?.spells?.length" class="action">
    <span class="font-bold italic"> {{ $t("statBlock.spellcasting") }}. </span>
    <MonsterDescription :parts="statistics.spellcasting!" />
  </p>
  <p v-if="statistics?.spells?.length" clas="action">
    <template v-for="group in statistics.spells" :key="group.name">
      <MonsterDescription
        :parts="group.nameArray"
        colon
      />&nbsp;<MonsterDescription :parts="group.array" />
      <br />
    </template>
  </p>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";
const statistics = inject("statistics") as ComputedRef<Statistics>;
</script>

<style scoped></style>
