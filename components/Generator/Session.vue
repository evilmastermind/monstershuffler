<template>
  <div class="session">
    <div class="generation">
      <template
        v-for="(character, index) in session"
        :key="`${index}${character.character.name}`"
      >
        <Transition name="fade-scroll-slow" appear>
          <MonsterCard
            :monster="character"
            :style="{
              transitionDelay: `${0.15 * index}s`,
              transitionProperty: 'opacity, transform',
            }"
            selectable
            @click="openCharacterSheet(character)"
          />
        </Transition>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Character } from "@/types/objects";

const generator = useGeneratorStore();

const { characters, currentCharacterIndex, session } = storeToRefs(generator);

function openCharacterSheet(character: Character) {
  if (!characters.value.includes(character)) {
    characters.value.push(character);
  }
  currentCharacterIndex.value = characters.value.length - 1;
}
</script>

<style scoped lang="scss">
.session {
  overflow-y: auto;
  @apply flex flex-col-reverse gap-6 w-full;
}
.generation {
  @apply grid grid-cols-1 gap-x-2 gap-y-2;
  @media (min-width: theme("screens.sm")) {
    @apply grid-cols-2;
  }
}
</style>
