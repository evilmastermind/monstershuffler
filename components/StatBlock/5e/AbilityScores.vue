<template>
  <div class="ability-scores-container">
    <p class="ability-scores">
      <span
        v-for="(ability, name) in statistics.abilities"
        :key="name"
        class="score"
      >
        <span class="ability-name" :class="moral">
          {{ $t(`statBlock.ability.${name}`) }}
        </span>
        <span>
          <MonsterDescription tag="span" :parts="ability.score.array" />
          (<MonsterDescription tag="span" :parts="ability.modifier.array" />)
        </span>
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";

const statistics = inject("statistics") as ComputedRef<Statistics>;
const moral = inject("moral") as string;
</script>

<style scoped>
.ability-scores-container {
  position: relative;
  container-type: inline-size;
}
.ability-scores {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}
@container (min-width: 375px) {
  .ability-scores {
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
