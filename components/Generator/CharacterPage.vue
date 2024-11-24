<template>
  <div class="page-container">
    <div v-if="currentCharacterIndex > -1">
      <Transition name="fade-quick" appear>
        <LazyMonsterSheetTools
          :generator-character="characters[currentCharacterIndex] as GeneratorCharacter"
          class="mt-5 sm:mt-0 px-0 sm:px-4"
        />
      </Transition>
      <Transition name="fade-quick" appear>
        <div v-show="isLoaded" ref="sheet" class="page mt-0 sm:mt-2">
          <LazyMonsterSheet
            :generator-character="characters[currentCharacterIndex] as GeneratorCharacter"
            @close="close"
            @loaded="isLoaded = true"
          />
        </div>
      </Transition>
    </div>
    <div v-if="!isLoaded" class="spinner">
      <LoadingSpinner />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GeneratorCharacter } from "@/types";

const generator = useGeneratorStore();
const { characters, currentCharacterIndex, currentSheetHTMLElement } =
  storeToRefs(generator);

const sheet = ref<HTMLElement | null>(null);
const isLoaded = ref(false);

function close() {
  generator.unsetCharacter();
}

onMounted(() => {
  if (sheet.value) {
    currentSheetHTMLElement.value = sheet.value;
  }
});
</script>

<style scoped>
.page-container {
  min-height: 100svh;
}
.page {
  overflow: hidden;
  @apply shadow;
}
.spinner {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

@media (min-width: theme("screens.sm")) {
  .page {
    @apply rounded mx-4;
  }
}
</style>
