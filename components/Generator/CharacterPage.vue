<template>
  <div v-if="currentCharacter">
    <MonsterSheetTools
      :character="currentCharacter"
      class="mt-5 sm:mt-0 px-0 sm:px-4"
    />
    <div ref="sheet" class="page mt-0 sm:mt-2">
      <LazyMonsterSheet
        :key="currentCharacterIndex"
        :character="currentCharacter"
        @close="close"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const generator = useGeneratorStore();
const { currentCharacterIndex, currentCharacter, currentSheetHTMLElement } =
  storeToRefs(generator);

const sheet = ref<HTMLElement | null>(null);

function close() {
  currentCharacterIndex.value = -1;
}

onMounted(() => {
  if (sheet.value) {
    currentSheetHTMLElement.value = sheet.value;
  }
});
</script>

<style scoped>
.page {
  overflow: hidden;
  @apply shadow;
}

@media (min-width: theme("screens.sm")) {
  .page {
    @apply rounded mx-4;
  }
}
</style>
