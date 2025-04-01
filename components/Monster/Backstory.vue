<template>
  <div>
    <div class="backstory">
      <EditorText
        :text="backstory"
        :stream-chunks="wrapper.streamChunks"
        :stream-status="wrapper.streamStatus"
        @text-updated="saveBackstory"
      />
      <LoadingDots
        v-if="
          !backstory && ['opening', undefined].includes(wrapper?.streamStatus)
        "
      />
      <div
        v-if="hooks?.length && !wrapper?.streamChunks.length"
        class="p-4 border-background-200 bg-background-200/20 border rounded w-fit break-inside-avoid mt-6"
      >
        <p class="font-[LibreBaskerville]">
          Generate a mini-adventure based on:
        </p>
        <div class="flex gap-2 mt-2">
          <MSButton
            v-for="(hook, index) in hooks"
            :key="index"
            color="light"
            @click="generateAdventure(index)"
          >
            {{ hook.type }}
          </MSButton>
        </div>
      </div>
      <Transition name="fade">
        <div
          v-if="
            backstory &&
            wrapper?.streamChunks.length &&
            ['closed', undefined].includes(wrapper?.streamStatus) &&
            hasRating
          "
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
                generator.setCurrentNPCRatingThrottle(rating, user.sessionId)
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

const p = defineProps({
  hasRating: {
    type: Boolean,
    default: true,
  },
});

const generator = useGeneratorStore();
const user = useUserStore();

const character = inject("character") as Ref<Character>;
const wrapper = inject("wrapper") as Ref<GeneratorCharacter>;

const hooks = character.value.character?.characterHooks;
const backstory = ref<string | undefined>(
  character.value?.character?.user?.backstory?.string as string | undefined
);
const tooManyRequests = ref(false);

const initialRating = ref<number>(0);

function getRating() {
  initialRating.value = generator.getCurrentNPCRating();
}

function saveBackstory(backstory: string) {
  if (!character.value.character.user) {
    character.value.character.user = {};
  }
  if (!character.value.character.user.backstory) {
    character.value.character.user!.backstory = {
      string: "",
      type: "backstory",
    };
  }
  character.value.character.user.backstory.string = backstory;
}

function generateAdventure(hook?: number) {
  generator.generateBackstory(wrapper, hook);
}

watch(
  () => wrapper.value.streamStatus,
  () => {
    backstory.value = character.value?.character?.user?.backstory?.string as
      | string
      | undefined;
  }
);

onMounted(() => {
  getRating();
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
