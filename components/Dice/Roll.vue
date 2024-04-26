<template>
  <div :id="id" class="dice-roll noselect pointer-events-none">
    <div ref="emojiContainer" class="container-center" />
    <DiceD20 :size="5" :stroke="1" class="container-center" invert />
    <DiceRollResult v-if="diceRoll" :roll="diceRoll" class="container-center" />
    <Transition name="roll-text">
      <img
        v-if="diceRoll?.d20Roll && diceRoll?.d20Roll === 20"
        class="roll-text text-success"
        src="@/assets/images/dice/crit.svg"
      />
      <img
        v-else-if="diceRoll?.d20Roll && diceRoll?.d20Roll === 1"
        class="roll-text text-danger"
        src="@/assets/images/dice/nat1.svg"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { emojisplosion } from "emojisplosion";
import type { DescriptionPart, Statistics, DiceRoll } from "@/types";

const rolls = useRollsStore();
const diceRoll = ref<DiceRoll>();
const id = `dice-roll-${new Date().getTime()}`;

const emojiContainer = ref<HTMLElement>();

const statistics = inject("statistics") as ComputedRef<Statistics>;

const p = defineProps({
  part: {
    type: Object as PropType<DescriptionPart>,
    required: true,
  },
});

onMounted(() => {
  if (!p.part.roll) {
    return;
  }
  diceRoll.value = rolls.rollDice(p.part.roll, statistics.value.name);

  // emojisplosion({
  //   className: "emojis",
  //   container: emojiContainer.value,
  //   position: {
  //     x: 0,
  //     y: 0,
  //   },
  //   emojiCount:
  //     diceRoll.value?.d20Roll && diceRoll.value.d20Roll === 20 ? 20 : 1,
  //   emojis: diceRoll.value.emojis,
  //   physics: {
  //     fontSize:
  //       diceRoll.value?.d20Roll && diceRoll.value.d20Roll === 1
  //         ? {
  //             min: 30,
  //             max: 60,
  //           }
  //         : {
  //             min: 20,
  //             max: 35,
  //           },
  //   },
  // });
});
</script>

<style scoped>
.dice-roll {
  position: absolute;
  top: calc(50% - 1.5rem);
  left: 50%;
  transform: translate(-50%, -50%);
}
.container-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.roll-text {
  position: absolute;
  min-width: 60px;
  left: 50%;
  top: 0.75rem;
  transform: translateX(-50%);
  z-index: 100;
}
.emojis {
  z-index: 0 !important;
}

.roll-text-crit {
  color: #00aa00;
}
.roll-text-fail {
  color: #ff0000;
}
.roll-text-enter-active,
.roll-text-leave-active {
  transition: opacity 0.1s ease-in, min-width 0.1s ease-in;
}
.roll-text-enter-from,
.roll-text-leave-to {
  opacity: 0.1;
  min-width: 0;
}
.roll-text-enter-to,
.roll-text-leave-from {
  opacity: 1;
}
</style>
