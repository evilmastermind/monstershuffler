<template>
  <button
    ref="button"
    class="underline text-textlight decoration-1"
    :class="part?.format || []"
    type="button"
    @click="isPreviewOpen = !isPreviewOpen"
  >
    {{ part.string }}
  </button>
  <MonsterSpellPreview
    v-if="isPreviewOpen && part.string !== undefined"
    :id="part.id || part.string"
    :name="part.string"
    :top="buttonTop"
    @close="isPreviewOpen = false"
  />
</template>

<script setup lang="ts">
import type { DescriptionPart } from "@/types";

const isPreviewOpen = ref(false);
const button = ref<HTMLButtonElement | null>(null);

const p = defineProps({
  part: {
    type: Object as PropType<DescriptionPart>,
    required: true,
  },
});

const buttonTop = computed(() => {
  if (button.value === null) return 0;
  return button.value.offsetTop;
});
</script>

<style scoped></style>
