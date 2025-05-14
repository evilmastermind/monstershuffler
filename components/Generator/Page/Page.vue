<template>
  <div class="relative">
    <Transition name="fade-quick" mode="out-in">
      <UProgress v-show="isLoading" size="sm" class="absolute top-0 w-full" />
    </Transition>
    <Transition name="fade-quick" mode="out-in">
      <div v-show="!isLoading" class="relative">
        <GeneratorPageBar />
        <GeneratorBits v-if="characters.length" class="mt-4" />
        <UContainer>
          <Transition name="fade-quick" appear>
            <GeneratorNPC
              v-if="currentCharacterIndex > -1"
              class="mt-4"
              @loading="isLoading = true"
              @loaded="isLoading = false"
            />
          </Transition>
        </UContainer>
        <UContainer v-show="currentCharacterIndex === -1" key="3">
          <div class="mt-4 md:mt-8">
            <div
              v-if="settings.isFormMode"
              class="hidden md:block float-left w-[300px] md:mr-6 mb-9"
            >
              <GeneratorForm />
              <UButton
                block
                variant="soft"
                color="neutral"
                class="mt-5"
                :label="$t('generator.form.generate')"
                trailing-icon="i-xxx-random"
                :loading="isButtonLoading"
                :disabled="isButtonLoading"
                @click="generateNpcsThrottle"
              />
            </div>
            <div class="">
              <GeneratorPageIntro v-if="isIntroShown" class="pt-12 md:pt-12" />
              <GeneratorCards v-else class="pt-4" />
            </div>
          </div>
        </UContainer>
      </div>
    </Transition>
    <MSFixedTools>
      <DiceHistory />
    </MSFixedTools>
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

const { session, characters, currentCharacterIndex, saveTrigger, settings } =
  storeToRefs(generator);

const isIntroShown = ref(true);
const isLoading = ref(false);
const isButtonLoading = ref(false);
const alert = ref<AlertMessage | null>(null);

const isFormShownOnMobile = ref(true);
const haveCharactersJustBeenRetrieved = ref(false);

const generateNpcsThrottle = throttle(() => generateNpcs(), 1000);

async function generateNpcs() {
  isButtonLoading.value = true;
  await generator.getRandomNpcs(settings.value.options, user.sessionId);
  isButtonLoading.value = false;
  generator.saveSettingsThrottle();
}

watch(session, (newSession) => {
  if (newSession.length) {
    isIntroShown.value = false;
  }
});

watch(
  [() => characters.value.length, saveTrigger, settings.value],
  () => {
    if (haveCharactersJustBeenRetrieved.value) {
      haveCharactersJustBeenRetrieved.value = false;
      return;
    }
    generator.saveSettingsThrottle();
  },
  { deep: true },
);

onBeforeMount(async () => {
  isLoading.value = generator.racesAndVariants.length === 0;
  // Retrieve the generator data
  await generator.getGeneratorData();
  const retrievedSettings =
    await user.getSettings<NPCGeneratorSettings>("npcgenerator");
  if (retrievedSettings) {
    const characters = retrievedSettings.characters.map((character) => {
      return {
        ...character,
        object: markRaw(character.object),
      };
    });
    settings.value = {
      ...retrievedSettings,
      characters,
    };
  }

  generator.parseSettings();
  if (
    settings.value?.characters?.length &&
    settings.value.characters[0].object
  ) {
    characters.value = [];
    settings.value.characters.forEach((character) => {
      characters.value.push(character);
    });
    haveCharactersJustBeenRetrieved.value = true;
  }

  // Check if we're viewing a specific NPC
  const uuid = route.params.uuid as string | undefined;
  const hook = route.params.hook as string | undefined;
  if (uuid) {
    await generator.getNpc(
      uuid,
      hook !== undefined ? parseInt(hook) : undefined,
    );
  }
  isLoading.value = false;
});
</script>

<style scoped></style>
