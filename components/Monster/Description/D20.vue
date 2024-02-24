<template>
  <span ref="container" class="roll noselect" @click="rollDice">
    {{ part.string }}
    <div v-if="isRollShown" class="roll">
      <span class="result">
        {{ result }}
      </span>
    </div>
  </span>
</template>

<script setup lang="ts">
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
  }, 3000);
}

function removeRoll(id: Date) {
  rolls.value.filter((roll) => roll.id !== id);
}

// function rollDice() {
//   const result = Math.floor(Math.random() * 20) + 1;

//   if (!container.value) {
//     return;
//   }
//   const containerRect = container.value.getBoundingClientRect();
//   emojisplosion({
//     className: "pointer-events-none",
//     position: {
//       x: containerRect.left + containerRect.width / 2,
//       y: containerRect.top,
//     },
//     emojiCount: result,
//     emojis: result > 1 ? ["🍀", "🎲", "🎲", "🎲", "🎲"] : ["💩"],
//     physics: {
//       opacityDecay: 20,
//     },
//   });
// }
</script>

<style scoped>
.roll {
  position: relative;
  border-bottom: 1px solid rgba(125, 125, 125, 0.3);
}
.roll:hover {
  cursor: pointer;
}
</style>
