<template>
  <div ref="bits" class="bits py-2">
    <TransitionGroup name="fade-row">
      <div :key="-1" class="buttons px-2">
        <button
          class="button-deleteall"
          :title="$t('generator.deleteAll')"
          @click="deleteAllCharacters"
        >
          <font-awesome-icon
            aria-hidden="true"
            icon="trash"
            :class="hasDeleteButtonBeenClickedOnce ? 'deleting' : ''"
          />
          <span class="sr-only">{{ $t("generator.deleteAll") }}</span>
        </button>
        <button
          class="button-deleteall"
          :title="$t('generator.saveAll')"
          disabled
        >
          <font-awesome-icon icon="floppy-disk" class="opacity-50" />
          <span class="sr-only">{{ $t("generator.saveAll") }}</span>
        </button>
      </div>
      <GeneratorBit
        v-for="(character, index) in characters"
        :key="index"
        :character="character"
        :index="index"
        @click="showCharacterPage(index)"
      />
    </TransitionGroup>
    <Transition name="fade-quick">
      <MonsterCard
        v-if="currentCharacterFromBitsPreview"
        class="bits-preview drop-shadow-2xl"
        :monster="currentCharacterFromBitsPreview"
        :style="{ top: `100%`, left: `${left}px`, width: `${width}px` }"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { x } = useMouse();
const { width: screenWidth } = useScreen();

const generator = useGeneratorStore();
const { characters, currentCharacterIndex, currentCharacterFromBitsPreview } =
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
  const bitsStartingPoint = bits.value?.getBoundingClientRect().left || 0;
  if (x.value + width.value / 2 > screenWidth.value) {
    return screenWidth.value - width.value;
  } else if (x.value - width.value / 2 < 0) {
    return 0;
  }
  console.log("result: ", x.value - width.value / 2);
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
  currentCharacterFromBitsPreview.value = null;
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
.buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 0;
  border-radius: 1rem;
  line-height: 1rem;

  @apply bg-primary-700 text-text-inverse shadow-md;
}
</style>
