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
              :generator-character="{
                key: 1,
                id: npc.id,
                streamChunks: [],
                object: npc.object as Character
              }"
              :style="{
                transitionDelay: `${0.15 * index}s`,
                transitionProperty: 'opacity, transform',
              }"
              selectable
              tabindex="0"
              @click="openCharacterSheet(index)"
              @pin="pinCharacter(index)"
            />
          </Transition>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NpcDetails } from "monstershuffler-shared";
import type { Character } from "@/types";

const generator = useGeneratorStore();

const { session } = storeToRefs(generator);

function openCharacterSheet(index: number) {
  const npc = session.value[index];
  generator.pushNewCharacter(npc as NpcDetails, true);
}

function pinCharacter(index: number) {
  const npc = session.value[index];
  generator.pushNewCharacter(npc as NpcDetails, false);
}
</script>

<style scoped>
.session {
  @apply flex flex-col-reverse gap-6 w-full;
}
.generation-4 {
  @apply grid grid-cols-1 gap-4;
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
