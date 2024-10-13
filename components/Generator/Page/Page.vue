<template>
  <div class="generator">
    <div class="background" />
    <NavbarPadding />
    <GeneratorPageBar
      v-model:mode="isFormMode"
      v-model:shown="isFormShownOnMobile"
      :is-button-loading
      :generate-npcs-throttle
    />
    <div class="lg-max max-h-100">
      <Transition name="fade">
        <div v-if="!isLoading">
          <TransitionGroup name="fade-group">
            <GeneratorBits v-if="characters.length" key="1" class="mt-4 mx-4" />
            <GeneratorCharacterPage
              v-if="currentCharacterIndex > -1"
              key="2"
              class="mt-4"
            />
            <div
              v-show="currentCharacterIndex === -1"
              key="3"
              class="custom-transition"
            >
              <div class="mx-4">
                <div v-if="isFormMode" class="form md:mr-6 mt-4 mb-9">
                  <GeneratorForm />
                  <MSButton
                    block
                    class="mt-5"
                    color="primary"
                    :text="$t('generator.form.generate')"
                    icon="fa6-solid:shuffle"
                    :loading="isButtonLoading"
                    :disabled="isButtonLoading"
                    @click="generateNpcsThrottle"
                  />
                </div>
                <div class="npcs centered">
                  <GeneratorPageIntro v-if="isIntroShown" class="mt-9" />
                  <GeneratorSession v-else class="mt-4" />
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </Transition>
      <!-- <div v-show="isLoading" class="mt-12">
        <LoadingSpinner />
      </div> -->
    </div>
    <GeneratorPageDescription class="mt-9" />
    <DiceHistory />
    <MSAlert v-if="isServerDown" type="danger" @close="isServerDown = false">
      <p>{{ $t("error.couldntRetrieveData") }}</p>
    </MSAlert>
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
import type { PostRandomNpcBody, NpcDetails } from "@/types";
import { throttle } from "@/utils";

type NPCGeneratorSettings = {
  characters: NpcDetails[];
  options: PostRandomNpcBody;
  isFormMode: boolean;
};

const generator = useGeneratorStore();
const user = useUserStore();

const { session, characters, currentCharacterIndex, options } =
  storeToRefs(generator);

const isIntroShown = ref(true);
const isLoading = ref(true);
const isButtonLoading = ref(false);
const isServerDown = ref(false);
const tooManyRequests = ref(false);

const isFormShownOnMobile = ref(true);
const haveCharactersJustBeenRetrieved = ref(false);
const isFormMode = ref(true);

const generateNpcsThrottle = throttle(() => generateNpcs(), 1000);
const saveSettingsThrottle = throttle(() => saveSettings(), 1000);

async function generateNpcs() {
  isButtonLoading.value = true;
  const reply = await generator.getRandomNpcs(options.value, user.sessionId);
  isButtonLoading.value = false;
  if (reply === 429) {
    tooManyRequests.value = true;
    return;
  }
  if (reply === 404) {
    isServerDown.value = true;
    return;
  }
  saveSettingsThrottle();
}

function saveSettings() {
  const settings: NPCGeneratorSettings = {
    characters: characters.value as NpcDetails[],
    options: options.value,
    isFormMode: isFormMode.value,
  };
  user.setSettings("npcgenerator", settings);
}

watch(session, (newSession) => {
  if (newSession.length) {
    isIntroShown.value = false;
  }
});

watch(
  characters,
  () => {
    if (haveCharactersJustBeenRetrieved.value) {
      haveCharactersJustBeenRetrieved.value = false;
      return;
    }
    saveSettingsThrottle();
  },
  { deep: true }
);

watch(isFormMode, () => {
  saveSettingsThrottle();
});

onMounted(async () => {
  isLoading.value = true;
  const status = await generator.getGeneratorData();
  if (status !== 200) {
    isServerDown.value = true;
  }
  const settings: NPCGeneratorSettings | null = await user.getSettings(
    "npcgenerator"
  );
  isFormMode.value = settings?.isFormMode ?? true;

  generator.parseSettings(settings?.options);

  if (settings?.characters?.length && settings.characters[0].object) {
    characters.value = settings.characters;
    haveCharactersJustBeenRetrieved.value = true;
  }
  isLoading.value = false;
});
</script>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      to bottom,
      theme("colors.background.0") 0,
      theme("colors.background.100") 10em
    )
    /*,     url("@/assets/images/generator-bg-1.jpg") no-repeat center center/cover; */;
  z-index: -2;
}
.form {
  display: none;
}
.mode-label {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: theme("spacing.2");
}

.npcs {
  max-height: 100%;
}
.character-name {
  font-family: "MrsEavesSmallCaps", serif;
  display: none;
}

@media (min-width: theme("screens.md")) {
  .button-show-settings {
    display: none;
  }
  .character-name {
    display: inline;
    letter-spacing: 0.03rem;
    @apply text-text;
  }
  .form {
    display: block;
    float: left;
    max-width: 300px;
  }
}
</style>
