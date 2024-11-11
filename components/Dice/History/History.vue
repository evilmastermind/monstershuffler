<template>
  <div class="dice-history mx-1 mb-2">
    <Transition name="fade-quick">
      <div v-if="!isHistoryOpen" class="dice-history-previews">
        <TransitionGroup name="list">
          <DiceHistoryPreview
            v-for="roll in diceRollsWithId"
            :key="`${roll.id}`"
            :roll="roll"
          />
        </TransitionGroup>
      </div>
    </Transition>
    <Transition name="fade-quick" mode="out-in">
      <DiceHistoryCard v-if="isHistoryOpen" @close="isHistoryOpen = false" />
      <button
        v-else
        class="d20-button mt-1"
        :title="$t('dice.open')"
        @click="isHistoryOpen = true"
      >
        <DiceD20 :size="2" :stroke="3" />
        <span class="sr-only">{{ $t("dice.open") }}</span>
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { DiceRoll } from "@/types";

const maxSize = 3;
const timeout = 5000;

type IdTimeout = {
  id: string;
  timeout: ReturnType<typeof setTimeout>;
};

const rolls = useRollsStore();

const diceRollsWithId = ref<(DiceRoll & IdTimeout)[]>([]);
const isHistoryOpen = ref(false);
const { diceRolls } = storeToRefs(rolls);
const areRollsLoaded = ref(false);

watch(diceRolls, () => {
  if (!diceRolls.value.length) {
    return;
  }
  if (diceRollsWithId.value.length >= maxSize) {
    diceRollsWithId.value.shift();
  }
  const newId = Math.random().toString(36).substring(7);
  diceRollsWithId.value.push({
    ...diceRolls.value[diceRolls.value.length - 1],
    id: newId,
    timeout: setTimeout(() => {
      removeRoll(newId);
    }, timeout),
  });
});

function removeRoll(id: string) {
  if (!diceRollsWithId.value.length) {
    return;
  }
  const index = diceRollsWithId.value.findIndex((roll) => roll.id === id);
  if (index === -1) {
    return;
  }
  clearTimeout(diceRollsWithId.value[index].timeout);
  diceRollsWithId.value.splice(index, 1);
}

onMounted(() => {
  rolls.loadFromLocalStorage();
});
</script>

<style scoped>
.dice-history {
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  z-index: 100;
  justify-content: flex-end;
  align-items: flex-end;
  @apply gap-1;
}
.dice-history-previews {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.25rem;
}
.d20-button {
  cursor: pointer;
}
</style>
