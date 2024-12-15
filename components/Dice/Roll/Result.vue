<template>
  <div
    class="result"
    :class="[
      p.roll.totalResult < 100 ? 'text-[2em]' : 'text-[1.5em]',
      roll?.d20Roll === 20 ? 'rainbow' : '',
      roll?.d20Roll === 1 ? 'poop' : '',
      currentThemeType === 'light' ? 'light-shadow' : 'dark-shadow',
    ]"
  >
    {{ roll.totalResult }}
  </div>
</template>

<script setup lang="ts">
import type { DiceRoll } from "@/types";

const ui = useUiStore();

const { currentThemeType } = storeToRefs(ui);

const p = defineProps({
  roll: {
    type: Object as PropType<DiceRoll>,
    required: true,
  },
});
</script>

<style scoped>
.result {
  font-family: "MrsEavesSmallCaps", serif;
  font-weight: 700;
  @apply text-text;
}
.light-shadow {
  text-shadow: 0px 0px 3px 3px white;
}
.dark-shadow {
  text-shadow: 0px 0px 3px 3px black;
}
</style>
