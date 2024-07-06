<template>
  <div class="backstory">
    <h1 class="name mb-2" :class="moral">{{ statistics.fullName }}</h1>
    <p class="backstory-text">
      {{ backstory }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Character, Statistics } from "@/types";
const generatorStore = useGeneratorStore();

const statistics = inject("statistics") as ComputedRef<Statistics>;
const character = inject("character") as ComputedRef<Character>;
const moral = inject("moral") as ComputedRef<string>;
const chunks = ref<string[]>([]);

const backstory = computed(() => {
  return character.value?.character?.user?.backstory?.string || "";
});

onMounted(() => {
  generatorStore.generateBackstory();
});
</script>

<style scoped>
.backstory {
}
.name {
  font-size: 2.5rem;
  line-height: 1;
  letter-spacing: 0.05em;
  font-weight: 500;
  font-family: "MrsEavesSmallCaps", serif;
}
.backstory-text {
  font-family: "LibreBaskerville", serif;
  line-height: 1.5;
  @apply my-2;
}
/*
.backstory-text:first-letter {
  initial-letter: 5;
  font-family: "AngloText";
  font-weight: 400;
  @apply text-text-neutral;
}
*/
</style>
