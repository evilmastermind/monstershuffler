<template>
  <div :id="id" ref="container" class="dice-roll noselect pointer-events-none">
    <div class="rotate" :style="{ transform: `rotate(${random(0, 360)}deg)` }">
      <svg
        viewBox="0 0 187 198"
        width="61"
        height="61"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="container-center"
      >
        <path
          d="M1 81C23.2829 68.4968 30.0034 56.8823 30.5 27C59.5272 24.3099 72.5232 18.9646 88.5 1C111.536 19.271 125.162 25.9978 152.5 23C159.352 52.4833 165.933 65.6655 186 79C173.436 104.754 169.575 119.534 173 147C142.8 156.724 130.381 167.645 116 196.5C92.9299 176.574 77.2024 170.922 43 173C35.7248 150.586 27.735 140.654 3 130C13.8952 110.517 16.1511 99.7089 1 81Z"
          fill="black"
          stroke="black"
        />
      </svg>
      <svg
        viewBox="0 0 187 198"
        width="55"
        height="55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="container-center"
      >
        <path
          d="M1 81C23.2829 68.4968 30.0034 56.8823 30.5 27C59.5272 24.3099 72.5232 18.9646 88.5 1C111.536 19.271 125.162 25.9978 152.5 23C159.352 52.4833 165.933 65.6655 186 79C173.436 104.754 169.575 119.534 173 147C142.8 156.724 130.381 167.645 116 196.5C92.9299 176.574 77.2024 170.922 43 173C35.7248 150.586 27.735 140.654 3 130C13.8952 110.517 16.1511 99.7089 1 81Z"
          fill="white"
          stroke="white"
        />
      </svg>
    </div>
    <DiceRollResult v-if="diceRoll" :roll="diceRoll" class="container-center" />
    <span
      v-if="diceRoll && diceRoll?.d20Roll === 20"
      class="roll-text roll-text-crit"
      >CRIT!</span
    >
    <span
      v-else-if="diceRoll && diceRoll?.d20Roll === 1"
      class="roll-text roll-text-fail"
      >NAT 1!</span
    >
  </div>
</template>

<script setup lang="ts">
import { emojisplosion } from "emojisplosion";
import { random } from "@/utils";
import type { DescriptionPart, Statistics } from "@/types";
import type { DiceRoll } from "@/stores";

const rolls = useRollsStore();
const diceRoll = ref<DiceRoll | null>(null);
const id = `dice-roll-${new Date().getTime()}`;

const container = ref<HTMLElement>();
const statistics = inject("statistics") as ComputedRef<Statistics>;

const p = defineProps({
  part: {
    type: Object as PropType<DescriptionPart>,
    required: true,
  },
  parent: {
    type: Object as PropType<HTMLElement | null>,
    required: true,
  },
});

onMounted(() => {
  if (!container.value || !p.parent) {
    return;
  }
  const parentRect = p.parent.getBoundingClientRect();
  container.value.style.left = `${parentRect.left + parentRect.width / 2}px`;
  container.value.style.top = `${parentRect.top}px`;

  diceRoll.value = rolls.rollDice(p.part, statistics.value.name);

  emojisplosion({
    container: container.value,
    position: {
      x: 0,
      y: 0,
    },
    emojiCount: diceRoll.value?.d20Roll
      ? Math.ceil(diceRoll.value?.d20Roll / 2)
      : random(5, 15),
    emojis: diceRoll.value.emojis,
  });
});
</script>

<style scoped>
.dice-roll {
  position: fixed;
}
.container-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.roll-text {
  position: absolute;
  top: 70%;
  left: 70%;
  transform: rotate(-40deg);
  font-family: "AdLib", Arial, Helvetica, sans-serif;
  font-size: 1em;
  font-weight: bold;
  text-shadow: 2px 2px 0px black;
  pointer-events: none;
  white-space: nowrap;
}

.roll-text-crit {
  color: #00aa00;
}
.roll-text-fail {
  color: #ff0000;
}
</style>
