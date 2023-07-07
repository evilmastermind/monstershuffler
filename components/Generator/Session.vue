<template>
  <div class="session">
    <div
      v-for="(characters, generation) in session"
      :key="generation"
      class="generation"
    >
      <MonsterCard
        v-for="(character, index) in characters"
        :key="index"
        :monster="character"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const generator = useGeneratorStore();

const { session } = storeToRefs(generator);
</script>

<style scoped lang="scss">
.session {
  @apply flex flex-col gap-6;
}
.generation {
  @apply grid grid-cols-1 gap-2;
  @media (min-width: theme("screens.sm")) {
    @apply grid-cols-2;
  }
}
</style>
