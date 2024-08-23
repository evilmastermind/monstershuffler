<template>
  <div v-if="backstory" class="backstory">
    <!-- <h1 class="name mb-2" :class="moral">{{ statistics.fullName }}</h1> -->
    <Markdown
      v-if="backstory.string"
      v-model="backstoryTest"
      class="backstory-text"
    />
    <LoadingDots v-if="!backstory && character.isStreamOpen === true" />
    <Transition name="fade">
      <div v-if="character.isStreamOpen === false">
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
const backstoryTest = ref(`
“...the clatter of echoed through the workshop; a symphony of saw and plane, steady hands shaping the wild chestnut into a graceful curve. Clarity

She breathed in the scent of sawdust and varnish, a simple reminder of creation amidst chaos. The outside world seemed a universe away, yet the tension brewed a storm behind her eyes. As the carved tendril unfurled, so did her thoughts, troubled by the call for change that wove through town...”
`);

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
.backstory-text h1 {
  font-size: 2.5rem;
  line-height: 1;
  letter-spacing: 0.05em;
  font-weight: 500;
  font-family: "MrsEavesSmallCaps", serif;
}
.backstory-text h2 {
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 0.02em;
  font-family: "MrsEavesSmallCaps", serif;
  line-height: 1em;
  @apply mt-6 mb-4;
}
.backstory-text h3 {
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.05em;
  line-height: 1em;
  font-family: "MrsEavesSmallCaps", serif;
  @apply mt-5 mb-2;
}
.backstory-text p {
  line-height: 1.6;
  font-size: 1rem;
  font-family: "LibreBaskerville", serif;
  @apply mt-2 mb-4;
}
.backstory-text p + p {
  text-indent: 1em;
}
</style>
