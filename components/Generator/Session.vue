<template>
  <div class="session">
    <div :class="session.length > 1 ? 'generation-4' : 'generation-1'">
      <template
        v-for="(character, index) in session"
        :key="`${index}${character.character.name}`"
      >
        <Transition name="fade-scroll-slow" appear>
          <MonsterCard
            :character="(character as Character)"
            class="shadow-md"
            :style="{
              transitionDelay: `${0.15 * index}s`,
              transitionProperty: 'opacity, transform',
            }"
            selectable
            tabindex="0"
            @click="openCharacterSheet(character as Character)"
          />
        </Transition>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from "@/types";

const generator = useGeneratorStore();

const { characters, currentCharacterIndex, session } = storeToRefs(generator);

function openCharacterSheet(character: Character) {
  const index = characters.value.findIndex((c) => c === character);
  if (index === -1) {
    characters.value.push(character);
    currentCharacterIndex.value = characters.value.length - 1;
  } else {
    currentCharacterIndex.value = index;
  }
}
</script>

<style scoped lang="scss">
.session {
  @apply flex flex-col-reverse gap-6 w-full;
}
.generation-4 {
  @apply grid grid-cols-1 gap-x-2 gap-y-2;
  @media (min-width: 620px) {
    @apply grid-cols-2;
  }
}
.generation-1 {
  display: grid;
  place-content: center;
}
</style>
