<template>
  <div v-if="backstory" class="backstory">
    <!-- <h1 class="name mb-2" :class="moral">{{ statistics.fullName }}</h1> -->
    <!-- <Markdown
      v-if="backstory.string"
      v-model="backstory.string"
      class="backstory-text"
    /> -->
    <EditorText :backstory="backstory.string as string" />
    <LoadingDots v-if="!backstory && character?.isStreamOpen === true" />
    <Transition name="fade">
      <div v-if="backstory && character?.isStreamOpen === false">
        <h3 class="content mt-6">
          {{ $t("generator.backstory.ratingQuestion") }}
        </h3>
        <MSStarRating
          v-model="rating"
          :size="2"
          @rate="
            (rating) =>
              generatorStore.setCurrentNPCRatingThrottle(rating, user.sessionId)
          "
        />
      </div>
    </Transition>
    <MSAlert
      v-if="tooManyRequests"
      type="danger"
      @close="tooManyRequests = false"
    >
      <p>{{ $t("error.tooManyRequests") }}</p>
    </MSAlert>
  </div>
</template>

<script setup lang="ts">
import type { Character, Statistics } from "@/types";

const generatorStore = useGeneratorStore();
const user = useUserStore();

const statistics = inject("statistics") as ComputedRef<Statistics>;
const characterStats = inject("character") as ComputedRef<Character>;
const moral = inject("moral") as ComputedRef<string>;
const tooManyRequests = ref(false);

const rating = ref<number>(0);
const { characters, currentCharacterIndex } = storeToRefs(generatorStore);

const backstory = computed(() => {
  return characterStats.value?.character?.user?.backstory;
});
const character = computed(() => {
  return characters.value[currentCharacterIndex.value];
});

function getRating() {
  rating.value = generatorStore.getCurrentNPCRating();
}

onMounted(async () => {
  getRating();
  if (backstory.value === undefined) {
    const result = await generatorStore.generateBackstory();
    if (result === 429) {
      tooManyRequests.value = true;
    }
  } else if (
    backstory.value !== null &&
    character.value.isStreamOpen === undefined
  ) {
    character.value.isStreamOpen = false;
  }
});
</script>

<style scoped>
.name {
  font-size: 2.5rem;
  line-height: 1;
  letter-spacing: 0.05em;
  font-weight: 500;
  font-family: "MrsEavesSmallCaps", serif;
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
<style>
.backstory-text *:focus {
  outline: none;
}
</style>
