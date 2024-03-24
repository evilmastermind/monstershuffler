<template>
  <div class="page mb-4">
    <MonsterSheet :character="currentCharacter" @close="close" />
  </div>
</template>

<script setup lang="ts">
const generator = useGeneratorStore();
const { currentCharacterIndex, currentCharacter } = storeToRefs(generator);
function close() {
  currentCharacterIndex.value = -1;
}
</script>

<style scoped>
.page {
  border-radius: 0.5rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1), inset 0 0 55px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}
</style>
