<template>
  <div class="generator">
    <!-- <BackgroundDice /> -->
    <div class="background" />
    <NavbarPadding />
    <div class="lg-max max-h-100">
      <Breadcrumbs class="mx-4">
        <template #default>
          <button @click="closeMonster">
            {{ $t("generator.pageTitle") }}
          </button>
          <span v-if="currentCharacter" class="character-name">
            > {{ currentCharacter?.statistics?.fullName || "" }}
          </span>
        </template>
        <template #options>
          <GeneratorPromptHelp v-if="mode === 'prompt'" />
          <MSSwitchWords
            v-model="isFormMode"
            checked="Form"
            unchecked="Prompt"
          />
          <!-- <label class="mode-label cursor-pointer">
            <MSSwitch
              v-model="isFormMode"
              :label="$t(`generator.${mode}ModeTitle`)"
            />
            <span class="bold inline whitespace-nowrap">
              {{ $t(`generator.${mode}ModeTitle`) }}
            </span>
          </label> -->
        </template>
      </Breadcrumbs>
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
              <div v-show="mode === 'prompt'" class="options mt-7 mb-6 mx-4">
                <GeneratorPrompt class="prompt" />
                <!-- <p class="content">{{ $t(`generator.${mode}ModeDescription`)  }}</p> -->
              </div>
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
      <div v-show="isLoading" class="mt-12">
        <LoadingSpinner />
      </div>
    </div>
    <DiceHistory />
    <MSAlert v-if="isServerDown" type="danger" @close="isServerDown = false">
      <p>{{ $t("error.couldntRetrieveData") }}</p>
    </MSAlert>
  </div>
</template>

<script setup lang="ts">
import type { Character, PostRandomNpcInput, NpcDetails } from "@/types";
import { throttle } from "@/utils";

type NPCGeneratorSettings = {
  characters: NpcDetails[];
  options: PostRandomNpcInput;
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

const isFormShownOnMobile = ref(true);
const haveCharactersJustBeenRetrieved = ref(false);
const isFormMode = ref(true);
const mode = computed(() => (isFormMode.value ? "form" : "prompt"));

const generateNpcsThrottle = throttle(() => generateNpcs(), 1000);
const saveSettingsThrottle = throttle(() => saveSettings(), 1000);

async function generateNpcs() {
  isButtonLoading.value = true;
  const reply = await generator.getRandomNpcs(options.value);
  isButtonLoading.value = false;
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
  if (settings?.options) {
    generator.parseSettings(settings.options);
  }
  if (settings?.characters?.length && settings.characters[0].object) {
    characters.value = settings.characters;
    haveCharactersJustBeenRetrieved.value = true;
  }
  isLoading.value = false;
});
</script>

<style lang="scss" scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      to bottom,
      theme("colors.background.0") 0,
      theme("colors.background.100") 10em,
      rgba(var(--colors-background-100), 0.5) 100%
    ),
    url("@/assets/images/generator-bg-1.jpg") no-repeat center center/cover;
  z-index: -2;
}

.generator {
  max-height: 100svh;
}
.form {
  float: left;
  @media (min-width: theme("screens.md")) {
    float: left;
    max-width: 300px;
  }
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
  @media (min-width: theme("screens.md")) {
    display: none;
  }
}
.generate-button {
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: theme("screens.md")) {
    display: none;
  }
  @apply gap-4;
}
.npcs {
  max-height: 100%;
}
.prompt {
  max-width: 500px;
  width: 100%;
}
.character-name {
  display: none;
}
@media (min-width: theme("screens.md")) {
  .character-name {
    display: inline;
    font-weight: normal;
    letter-spacing: 0.03rem;
    @apply text-text;
  }
}
</style>
