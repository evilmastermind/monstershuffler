<template>
  <div>
    <button @click="close">X</button>
    CHARACTER
  </div>
</template>

<script setup lang="ts">
const generator = useGeneratorStore();
const { currentCharacterIndex } = storeToRefs(generator);
function close() {
  currentCharacterIndex.value = -1;
}
</script>

<style scoped></style>
