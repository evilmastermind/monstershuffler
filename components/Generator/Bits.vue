<template>
  <div ref="bits" class="bits">
    <TransitionGroup name="fade-row">
      <div :key="-1" class="buttons px-2 mr-1">
        <MSIconButton
          :class="hasDeleteButtonBeenClickedOnce ? 'rainbow' : ''"
          :label="$t('generator.deleteAll')"
          icon="fa6-solid:trash"
          @click="deleteAllCharacters"
        />
        <MSIconButton
          class="opacity-30"
          :label="$t('generator.saveAll')"
          icon="fa6-solid:floppy-disk"
        />
      </div>
      <GeneratorBit
        v-for="(npc, index) in characters"
        :key="index"
        :character="npc.object as Character"
        :index="index"
        tabindex="0"
        @mousedown="showCharacterPage(index)"
        @click="showCharacterPage(index)"
      />
    </TransitionGroup>
    <MonsterCard
      v-if="currentCharacterFromBitsPreview"
      :character="currentCharacterFromBitsPreview as Character"
      class="bits-preview drop-shadow-2xl"
      :style="{ top: `100%`, left: `${left}px`, width: `${width}px` }"
    />
  </div>
</template>

<script setup lang="ts">
import type { Character } from "@/types";
const { x } = useMouse();
const { width: screenWidth } = useScreen();

const generator = useGeneratorStore();
const { characters, currentCharacterIndex, currentCharacterFromBitsPreview } =
  storeToRefs(generator);

useProvideCharacter(currentCharacterFromBitsPreview as Ref<Character>);

const hasDeleteButtonBeenClickedOnce = ref(false);
const hasSaveButtonBeenClickedOnce = ref(false);
const bits = ref<HTMLElement | null>(null);

const width = computed(() => {
  if (screenWidth.value < 400) {
    return screenWidth.value;
  }
  return 400;
});
const left = computed(() => {
  const bitsStartingPoint = bits.value?.getBoundingClientRect().left || 0;
  if (x.value + width.value / 2 + bitsStartingPoint + 2 > screenWidth.value) {
    return screenWidth.value - width.value - bitsStartingPoint * 2 - 1;
  } else if (x.value - width.value / 2 < 0) {
    return 0 - bitsStartingPoint;
  }
  return x.value - bitsStartingPoint - width.value / 2;
});

function deleteAllCharacters() {
  if (!hasDeleteButtonBeenClickedOnce.value) {
    hasDeleteButtonBeenClickedOnce.value = true;
    setTimeout(() => {
      hasDeleteButtonBeenClickedOnce.value = false;
    }, 1000);
    return;
  }
  hasDeleteButtonBeenClickedOnce.value = false;
  characters.value.length = 0;
  currentCharacterIndex.value = -1;
}

function showCharacterPage(index: number) {
  currentCharacterIndex.value = index;
  currentCharacterFromBitsPreview.value = undefined;
}
</script>

<style scoped>
.bits {
  position: relative;
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}
.bits-preview {
  position: absolute;
  top: 100%;
  z-index: 9990;
}

@media handheld {
  .bits-preview {
    display: none;
  }
}
.buttons {
  min-height: 3.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 0;
  border-radius: 1rem;
  line-height: 1rem;
  @apply bg-background-inset-500 text-text-icon;
}
.buttons button:hover {
  @apply text-primary-700;
}
</style>
