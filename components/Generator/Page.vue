<template>
  <div class="generator">
    <!-- <BackgroundDice /> -->
    <div class="background" />
    <NavbarPadding />
    <div class="lg-max max-h-100">
      <h1 class="content text-shadow">
        {{ $t("generator.title") }}
      </h1>
      <Transition name="fade">
        <div v-if="!isLoading">
          <TransitionGroup name="fade-group">
            <GeneratorBits v-if="characters.length" key="1" class="mt-4" />
            <GeneratorCharacterPage v-if="currentCharacterIndex > -1" key="2" />
            <div
              v-show="currentCharacterIndex === -1"
              key="3"
              class="custom-transition"
            >
              <div class="options mt-5 my-4">
                <label class="mode-label cursor-pointer">
                  <MSSlider
                    v-model:is-enabled="isFormMode"
                    :label="$t(`generator.${mode}ModeTitle`)"
                  />
                  <span class="bold inline whitespace-nowrap">
                    {{ $t(`generator.${mode}ModeTitle`) }}
                  </span>
                </label>
                <GeneratorPromptHelp v-if="mode === 'prompt'" />
                <button
                  v-if="mode === 'form'"
                  class="button-show-settings md:hidden cursor-pointer"
                  @click="isFormShownOnMobile = !isFormShownOnMobile"
                >
                  <font-awesome-icon
                    class="text-text-secondary"
                    icon="fas fa-solid fa-cog"
                    fixed-width
                  />
                  {{ $t("generator.options") }}
                </button>
                <GeneratorPrompt
                  v-show="mode === 'prompt'"
                  class="prompt max-w-[700px] min-w-[200px] w-full"
                />
                <!-- <p class="content">{{ $t(`generator.${mode}ModeDescription`)  }}</p> -->
              </div>
              <div>
                <GeneratorForm
                  v-show="mode === 'form' && isFormShownOnMobile"
                  ref="form"
                  class="form mb-4 md:mr-6"
                  @generate="generateNpcs"
                  @close="isFormShownOnMobile = false"
                />
                <div
                  v-show="mode !== 'prompt'"
                  class="generate-button text-center my-6"
                >
                  <MSButton
                    color="primary"
                    :text="$t('generator.form.generate')"
                    @click.prevent="generateNpcs"
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
  </div>
</template>

<script setup lang="ts">
import { useScreen } from "@/composables/screen";
import type { Character, PostRandomNpcInput } from "@/types";

type NPCGeneratorSettings = {
  characters: Character[];
  options: PostRandomNpcInput;
  isFormMode: boolean;
};

const generator = useGeneratorStore();
const user = useUserStore();

const { width, medium } = useScreen();
const { session, characters, currentCharacterIndex, options } =
  storeToRefs(generator);
const form = ref(null);
const isIntroShown = ref(true);
const isLoading = ref(true);

const isFormShownOnMobile = ref(true);
const haveCharactersJustBeenRetrieved = ref(false);
const isFormMode = ref(true);
const mode = computed(() => (isFormMode.value ? "form" : "prompt"));

function generateNpcs() {
  generator.generateNpcs(options.value);
  saveSettings();
}

function saveSettings() {
  const settings: NPCGeneratorSettings = {
    characters: characters.value as Character[],
    options: options.value,
    isFormMode: isFormMode.value,
  };
  user.setSettings("npcgenerator", settings);
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
  () => characters.value.length,
  () => {
    if (haveCharactersJustBeenRetrieved.value) {
      haveCharactersJustBeenRetrieved.value = false;
      return;
    }
    saveSettings();
  }
);

watch(isFormMode, () => {
  saveSettings();
});

onMounted(async () => {
  isLoading.value = true;
  await generator.getGeneratorData();
  const settings: NPCGeneratorSettings | null = await user.getSettings(
    "npcgenerator"
  );
  isFormMode.value = settings?.isFormMode ?? true;
  if (settings?.options) {
    generator.parseSettings(settings.options);
  }
  if (settings?.characters?.length) {
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
      theme("colors.background2") 0,
      theme("colors.background") 10em,
      rgba(var(--colors-background), 0.5) 100%
    ),
    url("@/assets/images/generator-bg-1.jpg") no-repeat center center/cover;
  // background-color: t($background2);
  // background: rgba(t($background2), 0.7)
  //   url("@/assets/images/generator-bg-1.jpg") no-repeat center center/cover;
  // background-blend-mode: t($background-blend-mode);
  //  ;
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
  position: realtive;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: theme("spacing.4");
  flex-wrap: wrap;
  @media (min-width: theme("screens.sm")) {
    flex-wrap: nowrap;
  }
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
  display: block;
  @media (min-width: theme("screens.md")) {
    display: none;
  }
}
.npcs {
  max-height: 100%;
}
</style>
