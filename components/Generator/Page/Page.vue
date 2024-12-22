<template>
  <div class="generator">
    <div class="background" />
    <NavbarPadding />
    <Transition name="fade-quick" appear mode="out-in">
      <div v-if="!isLoading">
        <GeneratorPageBar
          v-model:mode="isFormMode"
          v-model:shown="isFormShownOnMobile"
          :is-button-loading
          :generate-npcs-throttle
        />
        <div class="lg-max max-h-100">
          <GeneratorBits v-if="characters.length" key="1" class="mt-4 mx-4" />
          <Transition name="fade-quick" appear>
            <GeneratorCharacterPage
              v-if="currentCharacterIndex > -1"
              key="2"
              class="mt-4"
            />
          </Transition>
          <div
            v-show="currentCharacterIndex === -1"
            key="3"
            class="session-container"
            :style="{ minHeight: isIntroShown ? '0' : '100svh' }"
          >
            <div class="mx-4 mt-4 md:mt-7">
              <div v-if="isFormMode" class="form md:mr-6 mb-9">
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
              <div class="npcs">
                <GeneratorPageIntro v-if="isIntroShown" class="mt-9" />
                <GeneratorSession v-else />
              </div>
            </div>
          </div>
          <!-- <div v-show="isLoading" class="mt-12">
        <LoadingSpinner />
      </div> -->
        </div>
        <GeneratorPageDescription class="mt-11" />
      </div>
      <div v-else class="centered">
        <LoadingSpinner class="mt-8" />
      </div>
    </Transition>
    <DiceHistory />
    <MSAlert v-if="alert" :type="alert.type" @close="alert = null">
      <p>{{ alert.message }}</p>
    </MSAlert>
  </div>
</template>

<script setup lang="ts">
import type {
  NPCGeneratorSettings,
  GeneratorCharacter,
  AlertMessage,
} from "@/types";
import { throttle } from "@/utils";

const { t } = useI18n();
const route = useRoute();
const generator = useGeneratorStore();
const user = useUserStore();

const {
  session,
  characters,
  currentCharacterIndex,
  options,
  saveTrigger,
  settings,
} = storeToRefs(generator);

const isIntroShown = ref(true);
const isLoading = ref(true);
const isButtonLoading = ref(false);
const alert = ref<AlertMessage | null>(null);

const isFormShownOnMobile = ref(true);
const haveCharactersJustBeenRetrieved = ref(false);
const isFormMode = ref(false);

const generateNpcsThrottle = throttle(() => generateNpcs(), 1000);
const saveSettingsThrottle = throttle(() => saveSettings(), 3000);

async function generateNpcs() {
  isButtonLoading.value = true;
  const reply = await generator.getRandomNpcs(options.value, user.sessionId);
  isButtonLoading.value = false;
  if (reply === 429) {
    alert.value = {
      type: "danger",
      message: t("error.tooManyRequests"),
    };
    return;
  }
  if (reply === 404) {
    alert.value = {
      type: "danger",
      message: t("error.couldntRetrieveData"),
    };
    return;
  }
  if (reply === 500) {
    alert.value = {
      type: "danger",
      message: t("error.serverError"),
    };
    return;
  }
  saveSettingsThrottle();
}

function saveSettings() {
  const settings: NPCGeneratorSettings = {
    characters: characters.value as GeneratorCharacter[],
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

watch([() => characters.value.length, saveTrigger], () => {
  if (haveCharactersJustBeenRetrieved.value) {
    haveCharactersJustBeenRetrieved.value = false;
    return;
  }
  saveSettingsThrottle();
});

watch(isFormMode, () => {
  saveSettingsThrottle();
});

onBeforeMount(async () => {
  isFormMode.value = settings.value?.isFormMode ?? false;
  isLoading.value = generator.racesAndVariants.length === 0;
  // Retrieve the generator data
  const status = await generator.getGeneratorData();
  if (status !== 200) {
    alert.value = {
      type: "danger",
      message: t("error.notFoundExtended"),
    };
  }
  settings.value = await user.getSettings("npcgenerator");
  isFormMode.value = settings.value?.isFormMode ?? false;

  generator.parseSettings(settings.value?.options);
  if (
    settings.value?.characters?.length &&
    settings.value.characters[0].object
  ) {
    characters.value = [];
    settings.value.characters.forEach((character) => {
      characters.value.push({
        key: 0,
        id: character.id,
        streamChunks: character.streamChunks || [],
        // TODO: implement testing (Vitest?) to make sure that the object's content is NEVER reactive
        object: markRaw(character.object),
      });
    });
    haveCharactersJustBeenRetrieved.value = true;
  }
  // Check if we're viewing a specific NPC
  const uuid = route.params.uuid as string | undefined;
  if (uuid) {
    const npcStatus = await generator.getNpc(uuid);
    if (npcStatus !== 200) {
      alert.value = {
        type: "danger",
        message: t("error.couldntRetrieveData"),
      };
    }
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
  );
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.character-name {
  font-family: "MrsEavesSmallCaps", serif;
  display: none;
}
.session-container {
  transition: min-height 0.5s;
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
