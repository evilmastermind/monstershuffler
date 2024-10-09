<template>
  <div class="card">
    <div class="buttons pb-2">
      <MSIconButton
        :label="$t('dice.clear')"
        icon="fa6-solid:trash"
        @click="rolls.clear()"
      />
      <MSIconButton
        :label="$t('dice.close')"
        icon="fa6-solid:xmark"
        @click="emit('close')"
      />
    </div>
    <div class="rolls">
      <div v-for="monster in diceRollsByMonster" :key="monster.name">
        <b class="text-xs">{{ monster.name || $t("dice.you") }}</b>
        <div class="monster-rolls">
          <div v-for="roll in monster.rolls" :key="roll.totalResult">
            <p class="roll">
              <button @click="rolls.rollDice(roll.roll, monster.name)">
                <b class="roll-name">{{ rollName(roll) }}</b></button
              >:
              <DiceHistoryResult :roll />
              <br />
              <span class="text-sm text-text-secondary">{{
                roll.rollDetails
              }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <input
      v-model="rollAsString"
      type="text"
      class="ms-input w-full prompt pr-6 mt-2"
      placeholder="1d20 + 5"
      @keyup.enter="rolls.rollDiceAsString(rollAsString || '1d20')"
    />
  </div>
</template>

<script setup lang="ts">
import type { DiceRoll } from "@/types";

const emit = defineEmits(["close"]);

const rolls = useRollsStore();
const { t } = useI18n();

const { diceRolls } = storeToRefs(rolls);

const rollAsString = ref("");

type DiceRollsByMonster = {
  name: string;
  rolls: DiceRoll[];
}[];

const diceRollsByMonster = computed(() => {
  const rollsByMonster: DiceRollsByMonster = [];
  diceRolls.value.forEach((roll: DiceRoll) => {
    const firstMonster = rollsByMonster[0];
    if (firstMonster && firstMonster.name === roll.monster) {
      firstMonster.rolls.push(roll);
    } else {
      rollsByMonster.unshift({ name: roll.monster, rolls: [roll] });
    }
  });
  return rollsByMonster;
});

function rollName(roll: DiceRoll) {
  if (roll.rollName) {
    return roll.rollName;
  }
  if (roll.d20Roll !== undefined) {
    return t("dice.d20Roll");
  }
  return t("dice.diceRoll");
}
</script>

<style scoped>
.card {
  backdrop-filter: blur(4px);
  min-width: 250px;
  max-width: 250px;

  font-family: ScalaSansOffc;
  @apply shadow-xl p-2 rounded bg-background-200;
}
.rolls {
  min-width: 100%;
  max-height: 300px;
  min-height: 200px;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  gap: 1rem;
}
.monster-rolls {
  display: flex;
  flex-direction: column;
  @apply p-2 gap-1 rounded bg-background-50;
}
.roll {
  line-height: 1em;
}
.roll-name {
  font-weight: bold;
  text-decoration: underline;
  text-decoration-thickness: 1px;
}
.close {
  float: right;
}
.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style>
