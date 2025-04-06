<template>
  <div
    class="relative shadow-lg rounded-lg border-4 border-double border-background-500 bg-background-150 p-4"
  >
    <div :key="wrapper.key" class="stat-block font-[ScalaSansOffc]">
      <StatBlock55eHeader />
      <StatBlockColumns :columns-count="p.columnsCount">
        <div class="flex justify-between mt-2">
          <StatBlock55eACInitiative acronym />
        </div>
        <StatBlock55eHP acronym />
        <StatBlock55eSpeed />
        <StatBlock55eAbilityScores class="mt-1" />
        <StatBlockSkills class="mt-4" />
        <StatBlockResistancesImmunities />
        <StatBlockSensesLanguages />
        <StatBlock55eChallengeProficiency />
        <StatBlockTraits titled />
        <StatBlockActions />
        <StatBlockBonusActions />
        <StatBlockReactions />
        <StatBlockLegendaryActions />
      </StatBlockColumns>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character, GeneratorCharacter } from "@/types";

const p = defineProps({
  columnsCount: {
    type: Number,
    default: 1,
  },
});

const moral = inject("moral") as string;
const wrapper = inject("wrapper") as Ref<GeneratorCharacter>;
</script>

<style scoped>
.stat-block {
  position: relative;
  container-type: inline-size;
}
</style>
