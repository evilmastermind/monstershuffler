<template>
  <div
    class="backdrop-blur-sm min-w-[250px] max-w-[250px] font-[ScalaSansOffc] shadow-xl p-2 rounded bg-muted"
  >
    <div class="flex justify-end pb-2">
      <UTooltip :text="$t('dice.clear')">
        <UButton
          :aria-label="$t('dice.clear')"
          size="sm"
          color="neutral"
          variant="ghost"
          icon="i-xxx-trash"
          @click="rolls.clear()"
        />
      </UTooltip>
      <UTooltip :text="$t('dice.close')">
        <UButton
          :aria-label="$t('dice.close')"
          size="sm"
          color="neutral"
          variant="ghost"
          icon="i-xxx-close"
          @click="emit('close')"
        />
      </UTooltip>
    </div>
    <div
      class="min-w-full max-h-[300px] min-h-[200px] overflow-y-auto flex flex-col-reverse gap-4"
    >
      <div v-for="monster in diceRollsByMonster" :key="monster.name">
        <b class="text-xs">{{ monster.name || $t("dice.you") }}</b>
        <div class="flex flex-col p-2 gap-1 rounded bg-default">
          <div v-for="roll in monster.rolls" :key="roll.totalResult">
            <p class="leading-none">
              <button @click="rolls.rollDice(roll.roll, monster.name)">
                <b class="font-bold underline decoration-[1px]">
                  {{ rollName(roll) }}
                </b>
              </button>
              :
              <DiceHistoryResult :roll="roll" />
              <br />
              <span class="text-sm text-muted">{{ roll.rollDetails }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <UInput
      v-model="rollAsString"
      type="text"
      class="w-full mt-2"
      placeholder="1d20 + 5"
      @keyup.enter="rolls.rollDiceAsString(rollAsString || '1d20')"
    >
      <template #trailing>
        <UKbd value="enter" />
      </template>
    </UInput>
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
