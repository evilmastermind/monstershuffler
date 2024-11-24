<template>
  <div>
    <div v-if="backstory" class="backstory">
      <EditorText :backstory="backstory as string" />
      <LoadingDots
        v-if="
          !backstory &&
          ['open', undefined].includes(generatorStats?.streamStatus)
        "
      />
      <Transition name="fade">
        <div
          v-if="backstory && generatorStats?.streamStatus === 'closed'"
          class="hide-from-exports"
        >
          <h3 class="content mt-6">
            {{ $t("generator.backstory.ratingQuestion") }}
          </h3>
          <MSStarRating
            v-model="initialRating"
            :size="2"
            @rate="
              (rating) =>
                generatorStore.setCurrentNPCRatingThrottle(
                  rating,
                  user.sessionId
                )
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
  </div>
</template>

<script setup lang="ts">
import type { Character, GeneratorCharacter } from "@/types";

const generatorStore = useGeneratorStore();
const user = useUserStore();

const character = inject("character") as Ref<Character>;
const wrapper = inject("wrapper") as Ref<GeneratorCharacter>;

const backstory = ref<string>();
const tooManyRequests = ref(false);

const initialRating = ref<number>(0);
const { characters, currentCharacterIndex } = storeToRefs(generatorStore);

const generatorStats = computed(() => {
  return characters.value[currentCharacterIndex.value];
});

function getRating() {
  initialRating.value = generatorStore.getCurrentNPCRating();
}

watch(
  () => wrapper.value.streamChunks.length,
  () => {
    backstory.value = character.value?.character?.user?.backstory
      ?.string as string;
  }
);

onMounted(async () => {
  getRating();
  backstory.value = character.value?.character?.user?.backstory
    ?.string as string;

  // also needs to check if there aren't chunks
  console.log("backstory", backstory.value);
  console.log("streamStatus", generatorStats.value.streamStatus);
  if (backstory.value === undefined && !wrapper.value.streamStatus) {
    const result = await generatorStore.generateBackstory(wrapper);
    console.log("result", result);
    if (result === 429) {
      tooManyRequests.value = true;
    }
  } else if (
    backstory.value !== null &&
    generatorStats.value.streamStatus === undefined
  ) {
    generatorStats.value.streamStatus = "closed";
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
