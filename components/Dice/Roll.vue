<template>
  <div ref="container" class="dice-roll">
    <DiceRollD20 v-if="part.type === 'd20Roll'" :part="part" />
    <DiceRollDice v-else :part="part" />
  </div>
</template>

<script setup lang="ts">
import type { DescriptionPart, Point } from "@/types";

const container = ref<HTMLElement | null>(null);

const p = defineProps({
  part: {
    type: Object as PropType<DescriptionPart>,
    required: true,
  },
  parent: {
    type: Object as PropType<HTMLElement>,
    required: true,
  },
});

onMounted(() => {
  if (!container.value) {
    return;
  }
  const parentRect = p.parent.getBoundingClientRect();
  container.value.style.left = `${parentRect.left + parentRect.width / 2}px`;
  container.value.style.top = `${parentRect.top}px`;
});
</script>

<style scoped></style>
