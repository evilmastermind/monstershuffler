<template>
  <div
    class="result text-default"
    :class="[
      p.roll.totalResult < 100 ? 'text-[2em]' : 'text-[1.5em]',
      roll?.d20Roll === 20 ? 'rainbow' : '',
      roll?.d20Roll === 1 ? 'poop' : '',
      isDark ? 'dark-shadow' : 'light-shadow',
    ]"
  >
    {{ roll.totalResult }}
  </div>
</template>

<script setup lang="ts">
import type { DiceRoll } from "@/types";

const ui = useUiStore();

const { isDark } = storeToRefs(ui);

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
}
.light-shadow {
  text-shadow: 0px 0px 3px 3px white;
}
.dark-shadow {
  text-shadow: 0px 0px 3px 3px black;
}
</style>
