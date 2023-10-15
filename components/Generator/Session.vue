<template>
  <div class="session">
    <TransitionGroup name="slidetransition" appear>
      <div
        v-for="characters in session"
        :key="characters[0].character.name"
        class="generation"
      >
        <template v-for="(character, index) in characters" :key="index">
          <Transition name="fade-scroll-slow" appear>
            <MonsterCard
              :monster="character"
              :style="{ transitionDelay: `${0.15 * index}s` }"
              selectable
              @click="openCharacterSheet(character)"
            />
          </Transition>
        </template>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { Character } from "@/types/objects";

const generator = useGeneratorStore();

const { characters, currentCharacterIndex, session } = storeToRefs(generator);

function openCharacterSheet(character: Character) {
  characters.value.push(character);
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
