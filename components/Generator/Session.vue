<template>
  <div>
    <!-- <h3 class="content text-text-evil">
      {{ $t("generator.pickOne") }}
    </h3> -->
    <div class="session mt-2">
      <div :class="session.length > 1 ? 'generation-4' : 'generation-1'">
        <template v-for="(npc, index) in session" :key="`${index}${npc.id}`">
          <Transition name="fade-scroll-slow" appear>
            <MonsterCard
              :character="(npc.object as Character)"
              :style="{
                transitionDelay: `${0.15 * index}s`,
                transitionProperty: 'opacity, transform',
              }"
              selectable
              tabindex="0"
              @click="openCharacterSheet(index)"
            />
          </Transition>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from "@/types";

const generator = useGeneratorStore();

const { characters, currentCharacterIndex, session } = storeToRefs(generator);

function openCharacterSheet(index: number) {
  const npc = session.value[index];
  const characterIndex = characters.value.findIndex((c) => c.id === npc.id);
  if (characterIndex === -1) {
    characters.value.push(npc);
    currentCharacterIndex.value = characters.value.length - 1;
  } else {
    currentCharacterIndex.value = characterIndex;
  }
}
</script>

<style scoped>
.session {
  @apply flex flex-col-reverse gap-6 w-full;
}
.generation-4 {
  @apply grid grid-cols-1 gap-x-2 gap-y-2;
}
.generation-1 {
  display: grid;
  place-content: center;
}
@media (min-width: 620px) {
  .generation-4 {
    @apply grid-cols-2;
  }
}
</style>
