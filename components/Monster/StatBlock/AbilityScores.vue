<template>
  <div class="abilityScores">
    <span
      v-for="(score, ability) in statistics.abilityScores"
      :key="ability"
      class="score"
    >
      <span class="ability-name" :class="moral">
        {{ $t(`statBlock.ability.${ability}`) }}
      </span>
      <span class="ability-score">
        {{ score }} {{ getModifier(ability) }}
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import type { Ability } from "@/parsers";
import type { Statistics } from "@/types";

const statistics = inject("statistics") as ComputedRef<Statistics>;
const moral = inject("moral") as string;

function getModifier(ability: Ability) {
  const modifier = statistics.value.abilityModifiers[ability];
  const plusSign = modifier >= 0 ? "+" : "";
  return `(${plusSign}${modifier})`;
}
</script>

<style scoped lang="scss">
.abilityScores {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  @media (min-width: theme("screens.sm")) {
    display: flex;
    justify-content: space-evenly;
  }
}
.score {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ability-name {
  font-weight: bold;
}
</style>
