<template>
  <div class="generator">
    <!-- <BackgroundDice /> -->
    <div class="background" />
    <NavbarPadding />

    <div class="top-bar-container py-4 px-4">
      <div class="top-bar lg-max">
        <h1 class="top-bar-page-title">{{ $t("generator.title") }}</h1>
        <GeneratorPrompt v-show="mode === 'prompt'" class="prompt" />
        <div class="top-bar-options">
          <GeneratorPromptHelp v-if="mode === 'prompt'" />
          <MSSwitchWords
            v-model="isFormMode"
            checked="Form"
            unchecked="Prompt"
          />
        </div>
      </div>
    </div>
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
              <div class="mt-4 mx-4">
                <GeneratorForm
                  v-show="mode === 'form' && isFormShownOnMobile"
                  ref="form"
                  class="form md:mr-6"
                  :is-button-loading
                  @generate="generateNpcsThrottle"
                  @close="isFormShownOnMobile = false"
                />
                <div
                  v-show="mode !== 'prompt'"
                  class="generate-button text-center my-6"
                >
                  <MSButton
                    color="primary"
                    :text="$t('generator.form.generate')"
                    icon="fa6-solid:shuffle"
                    :loading="isButtonLoading"
                    :disabled="isButtonLoading"
                    @click.prevent="generateNpcsThrottle"
                  />
                  <MSIconButton
                    class="button-show-settings md:hidden text-text-secondary"
                    :label="$t('generator.options')"
                    size="24"
                    icon="fa-solid:cog"
                    @click="isFormShownOnMobile = !isFormShownOnMobile"
                  />
                </div>
                <div class="npcs centered pt-4">
                  <GeneratorIntro v-if="isIntroShown" />
                  <GeneratorSession v-else />
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
import type { Character, PostRandomNpcBody, NpcDetails } from "@/types";
import { throttle } from "@/utils";

type NPCGeneratorSettings = {
  characters: NpcDetails[];
  options: PostRandomNpcBody;
  isFormMode: boolean;
};

const generator = useGeneratorStore();
const user = useUserStore();

const { width, medium } = useScreen();
const {
  session,
  characters,
  currentCharacter,
  currentCharacterIndex,
  options,
} = storeToRefs(generator);
const { currentEditorMode } = storeToRefs(useMonsterEditorStore());
const form = ref(null);

const isIntroShown = ref(true);
const isLoading = ref(true);
const isButtonLoading = ref(false);
const isServerDown = ref(false);
const tooManyRequests = ref(false);

const isFormShownOnMobile = ref(true);
const haveCharactersJustBeenRetrieved = ref(false);
const isFormMode = ref(true);
const mode = computed(() => (isFormMode.value ? "form" : "prompt"));

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

function closeMonster() {
  currentCharacterIndex.value = -1;
  currentEditorMode.value = "";
}

watch(width, (newWidth, oldWidth) => {
  if (newWidth >= medium.value && oldWidth < medium.value) {
    isFormShownOnMobile.value = true;
  } else if (newWidth < medium.value && oldWidth >= medium.value) {
    isFormShownOnMobile.value = false;
  }
});

watch(
  medium,
  (newMedium) => {
    if (width.value) {
      if (width.value >= newMedium) {
        isFormShownOnMobile.value = true;
      } else if (width.value < newMedium) {
        isFormShownOnMobile.value = false;
      }
    }
  },
  { immediate: true }
);

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
.top-bar-container {
  @apply bg-background-100 border-b border-b-background-200;
}
.top-bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  @apply gap-4;
}
@media (min-width: theme("screens.sm")) {
  .top-bar {
    grid-template-columns: 1fr 50% 1fr;
  }
}
.top-bar-page-title {
  font-family: "OpenSans", sans-serif;
  font-weight: 800;
  font-size: 1.2rem;
  letter-spacing: -0.09em;
  @apply text-text-evil;
}
.top-bar-options {
  display: flex;
  justify-content: flex-end;
  @apply gap-2;
}
.form {
  float: left;
}
.mode-label {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: theme("spacing.2");
}
.options {
  display: flex;
  justify-content: center;
  align-items: center;
}
.overflow-hidden {
  overflow: hidden;
}
.button-show-settings {
  display: block;
}
.generate-button {
  display: flex;
  justify-content: center;
  align-items: center;
  @apply gap-4;
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
  .generate-button {
    display: none;
  }
  .character-name {
    display: inline;
    letter-spacing: 0.03rem;
    @apply text-text;
  }
  .form {
    float: left;
    max-width: 300px;
  }
}
</style>
