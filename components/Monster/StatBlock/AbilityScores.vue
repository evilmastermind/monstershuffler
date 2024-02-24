<template>
  <p class="abilityScores">
    <span
      v-for="(score, ability) in statistics.abilities"
      :key="ability"
      class="score"
    >
      <span class="ability-name" :class="moral">
        {{ $t(`statBlock.ability.${ability}`) }}
      </span>
      <MonsterDescription :parts="score.array" tag="span" />
    </span>
  </p>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";

const statistics = inject("statistics") as ComputedRef<Statistics>;
const moral = inject("moral") as string;
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
