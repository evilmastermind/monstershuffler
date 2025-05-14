<template>
  <div>
    <div class="flex flex-col-reverse items-center gap-6 mt-2">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-4xl">
        <template v-for="(npc, index) in session" :key="`${index}${npc.id}`">
          <Transition name="fade-scroll-slow" appear>
            <MonsterCard
              class="text-sm"
              :generator-character="{
                key: 1,
                id: npc.id,
                streamChunks: [],
                object: npc.object as Character,
              }"
              :style="{
                transitionDelay: `${0.15 * index}s`,
                transitionProperty: 'opacity, transform',
              }"
              :index
              selectable
              tabindex="0"
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

const { session } = storeToRefs(generator);
</script>

<style scoped></style>
