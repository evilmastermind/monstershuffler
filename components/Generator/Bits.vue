<template>
  <UContainer>
    <div ref="bits" class="relative flex flex-wrap gap-1">
      <TransitionGroup name="fade-row">
        <div
          :key="-1"
          class="flex flex-col justify-evenly items-center rounded-full bg-elevated overflow-hidden mr-1"
        >
          <UTooltip :text="$t('generator.deleteAll')">
            <UButton
              :class="[hasDeleteButtonBeenClickedOnce ? 'rainbow' : '']"
              :aria-label="$t('generator.deleteAll')"
              icon="i-xxx-trash"
              size="sm"
              color="neutral"
              variant="ghost"
              @click="deleteAllCharacters"
            />
          </UTooltip>
          <UTooltip :text="$t('generator.saveAll')">
            <UButton
              class="opacity-30"
              :aria-label="$t('generator.saveAll')"
              size="sm"
              color="neutral"
              variant="ghost"
              icon="i-xxx-floppy"
            />
          </UTooltip>
        </div>
        <GeneratorBit
          v-for="(npc, index) in characters"
          :key="npc.id"
          :index="index"
          tabindex="0"
          @mousedown="showCharacterPage(index)"
          @click="showCharacterPage(index)"
          @deleted="generator.spliceCharacter(index)"
        />
      </TransitionGroup>
      <MonsterCard
        v-if="currentCharacterBitIndex > -1"
        :generator-character="
          characters[currentCharacterBitIndex] as GeneratorCharacter
        "
        class="absolute top-full z-[9990] mt-1 drop-shadow-2xl font-[ScalaSansOffc]"
        :style="{ top: `100%`, left: `${left}px`, width: `${width}px` }"
      />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { GeneratorCharacter } from "@/types";
const { x } = useMouse();
const { width: screenWidth } = useScreen();

const generator = useGeneratorStore();
const { characters, currentCharacterIndex, currentCharacterBitIndex } =
  storeToRefs(generator);

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
  const bitsStartingPoint = bits.value?.getBoundingClientRect()?.left || 0;
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
  generator.clearAllCharacters();
}

function showCharacterPage(index: number) {
  generator.setCharacter(index);
  currentCharacterBitIndex.value = -1;
}

onMounted(() => {
  currentCharacterBitIndex.value = -1;
});
</script>
