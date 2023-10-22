<template>
  <div class="bits py-2">
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
        @click="currentCharacterIndex = index"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
const generator = useGeneratorStore();
const { characters, currentCharacterIndex } = storeToRefs(generator);

const hasDeleteButtonBeenClickedOnce = ref(false);
const hasSaveButtonBeenClickedOnce = ref(false);

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
</script>

<style scoped>
.bits {
  display: flex;
  gap: 0.25rem;
  overflow: hidden;
  flex-wrap: wrap;
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
