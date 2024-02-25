<template>
  <button ref="container" class="roll noselect" @click="rollDice">
    {{ part.string }}
    <TransitionGroup name="roll">
      <DiceRoll
        v-for="(roll, index) in rolls"
        :key="index"
        :part="part"
        :parent="container"
      />
    </TransitionGroup>
  </button>
</template>

<script setup lang="ts">
/**
 * This component is used to display a dice roll in its text format,
 * and an animation for a brief period of time when the text is clicked.
 * Check DiceRoll.vue for the actual dice roll component.
 */
import type { DescriptionPart } from "@/types";

type Roll = {
  id: Date;
};

const rolls = ref<Roll[]>([]);

const container: Ref<HTMLElement | null> = ref(null);

const p = defineProps({
  part: {
    type: Object as PropType<DescriptionPart>,
    required: true,
  },
});

function rollDice() {
  const id = new Date();
  rolls.value.push({ id });
  setTimeout(() => {
    removeRoll(id);
  }, 1000);
}

function removeRoll(id: Date) {
  const index = rolls.value.findIndex((roll) => roll.id === id);
  if (index === -1) {
    return;
  }
  rolls.value.splice(index, 1);
}
</script>

<style scoped>
.roll {
  display: inline;
  line-height: inherit;
  position: relative;
  border-bottom: 1px solid rgba(125, 125, 125, 0.3);
}
.roll:hover {
  cursor: pointer;
}
</style>
