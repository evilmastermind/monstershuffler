<template>
  <div class="page p-4 mb-4">
    <button @click="close">X</button>
    <MonsterStatBlock
      :character="generator.characters[currentCharacterIndex]"
    />
  </div>
</template>

<script setup lang="ts">
const generator = useGeneratorStore();
const { currentCharacterIndex } = storeToRefs(generator);
function close() {
  currentCharacterIndex.value = -1;
}
</script>

<style scoped>
.page {
  border-radius: 0.5rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1), inset 0 0 55px rgba(0, 0, 0, 0.05);
  @apply bg-background-card;
}
</style>
