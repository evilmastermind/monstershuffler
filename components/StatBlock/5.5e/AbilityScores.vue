<template>
  <div>
    <div class="abilities-grid gap-x-[5%]">
      <p v-for="number in 3" :key="number">
        <span class="ability-grid text-[11px] leading-none text-text-2">
          <span></span>
          <span></span>
          <span>MOD</span>
          <span>SAVE</span>
        </span>
      </p>
    </div>
    <div class="abilities-grid border-t-background-0 border-t gap-x-[5%]">
      <p v-for="(ability, name) in abilities1" :key="name">
        <span class="ability-grid" :class="moral">
          <span
            class="font-bold small-caps"
            :class="`yellow-${currentThemeType}`"
          >
            {{ capitalizeFirst($t(`statBlock.ability.${name}`)) }}
          </span>
          <span :class="`yellow-${currentThemeType}`">
            <MonsterDescription :parts="ability.score.array" tag="span" />
          </span>
          <span :class="`orange-${currentThemeType}`">
            <MonsterDescription :parts="ability.modifier.array" tag="span" />
          </span>
          <span :class="`orange-${currentThemeType}`">
            <MonsterDescription :parts="ability.save.array" tag="span" />
          </span>
        </span>
      </p>
    </div>
    <div class="abilities-grid border-y-background-0 border-y gap-x-[5%]">
      <p v-for="(ability, name) in abilities2" :key="name">
        <span class="ability-grid" :class="moral">
          <span
            class="font-bold small-caps"
            :class="`green-${currentThemeType}`"
          >
            {{ capitalizeFirst($t(`statBlock.ability.${name}`)) }}
          </span>
          <span :class="`green-${currentThemeType}`">
            <MonsterDescription :parts="ability.score.array" tag="span" />
          </span>
          <span :class="`grey-${currentThemeType}`">
            <MonsterDescription :parts="ability.modifier.array" tag="span" />
          </span>
          <span :class="`grey-${currentThemeType}`">
            <MonsterDescription :parts="ability.save.array" tag="span" />
          </span>
        </span>
      </p>
      <!-- <MonsterDescription :parts="score.array" tag="span" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Statistics, AbilitiesEnum } from "@/types";

const ui = useUiStore();

const statistics = inject("statistics") as ComputedRef<Statistics>;
const moral = inject("moral") as string;

const { currentThemeType } = storeToRefs(ui);

const abilities1 = computed(() => ({
  STR: statistics.value.abilities.STR,
  DEX: statistics.value.abilities.DEX,
  CON: statistics.value.abilities.CON,
}));
const abilities2 = computed(() => ({
  INT: statistics.value.abilities.INT,
  WIS: statistics.value.abilities.WIS,
  CHA: statistics.value.abilities.CHA,
}));

function isRow1(ability: string) {
  switch (ability) {
    case "STR":
    case "DEX":
    case "CON":
      return true;
    default:
      return false;
  }
}
</script>

<style scoped>
.abilities-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.ability-grid {
  display: grid;
  justify-content: center;
  text-align: center;
  grid-template-columns: repeat(4, 1fr);
}
.yellow-light {
  background-color: hsl(42, 29%, 88%);
}
.orange-light {
  background-color: hsl(34, 18%, 82%);
}
.green-light {
  background-color: hsl(90, 16%, 83%);
}
.grey-light {
  background-color: hsl(30, 7%, 79%);
}
.yellow-dark {
  background-color: hsl(42, 29%, 8%);
}
.orange-dark {
  background-color: hsl(34, 28%, 8%);
}
.green-dark {
  background-color: hsl(90, 26%, 8%);
}
.grey-dark {
  background-color: hsl(30, 7%, 8%);
}
</style>
