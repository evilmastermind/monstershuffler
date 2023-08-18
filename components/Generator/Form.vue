<template>
  <div class="form-container">
    <form class="generator-form p-4 md:mr-4 rounded shadow-md md:shadow-none">
      <fieldset>
        <button
          class="close-button cursor-pointer"
          type="button"
          @click="e('close')"
        >
          <font-awesome-icon
            :icon="['fas', 'xmark']"
            size="lg"
            aria-hidden="true"
          />
          <span class="sr-only">{{ $t("closeLabel") }}</span>
        </button>
        <!-- PRIMARY AND SECONDARY RACES -->
        <span class="form-line">
          <label class="ms-label" for="gen-prace"
            >{{ $t("generator.form.primaryRace") }}:</label
          >
          <div class="flex items-center justify-between gap-1">
            <select
              id="gen-prace"
              v-model="primaryRaceIndex"
              class="ms-select ms-select-75"
            >
              <option v-for="(race, i) in races" :key="i" :value="i">
                {{ race.name }}
                {{ race.variantName ? ` (${race.variantName})` : "" }}
              </option>
            </select>
            <select
              id="gen-prace-perc"
              v-model="primaryRacePercentage"
              class="ms-select ms-select-20"
            >
              <option v-for="index in 21" :key="index" :value="(index - 1) * 5">
                {{ `${(index - 1) * 5}%` }}
              </option>
            </select>
          </div>
        </span>
        <span class="form-line">
          <label class="ms-label" for="gen-srace"
            >{{ $t("generator.form.secondaryRace") }}:</label
          >
          <div class="flex items-center justify-between gap-1">
            <select
              id="gen-srace"
              v-model="secondaryRaceIndex"
              class="ms-select ms-select-75"
            >
              <option v-for="(race, i) in races" :key="i" :value="i">
                {{ race.name }}
                {{ race.variantName ? ` (${race.variantName})` : "" }}
              </option>
            </select>
            <select
              id="gen-srace-perc"
              v-model="secondaryRacePercentage"
              class="ms-select ms-select-20"
            >
              <option v-for="index in 21" :key="index" :value="(index - 1) * 5">
                {{ `${(index - 1) * 5}%` }}
              </option>
            </select>
          </div>
        </span>
        <!-- CLASS -->
        <span class="form-line">
          <label class="ms-label" for="gen-class"
            >{{ $t("generator.form.class") }}:</label
          >
          <select
            id="gen-class"
            v-model="options.classType"
            class="ms-select ms-select-100"
          >
            <option value="none">
              {{ $t("generator.form.none") }}
            </option>
            <option value="randomSometimes" selected>
              {{ $t("generator.form.randomSometimes") }}
            </option>
            <option value="randomAlways">
              {{ $t("generator.form.randomAlways") }}
            </option>
            <option value="specific">
              {{ $t("generator.form.specific") }}
            </option>
          </select>
        </span>
        <span v-if="options.classType === 'specific'" class="form-line">
          <select
            id="gen-classes"
            v-model="classIndex"
            class="ms-select ms-select-100 mt-1"
          >
            <option v-for="(aClass, i) in classes" :key="i" :value="i">
              {{ aClass.name }}
              {{ aClass.variantName ? ` (${aClass.variantName})` : "" }}
            </option>
          </select>
        </span>
        <!-- BACKGROUND -->
        <span class="form-line">
          <label class="ms-label" for="gen-background"
            >{{ $t("generator.form.background") }}:</label
          >
          <select
            id="gen-background"
            v-model="options.backgroundType"
            class="ms-select ms-select-100"
          >
            <option value="none">
              {{ $t("generator.form.none") }}
            </option>
            <option value="random" selected>
              {{ $t("generator.form.random") }}
            </option>
            <option value="specific">
              {{ $t("generator.form.specific") }}
            </option>
          </select>
        </span>
        <span v-if="options.backgroundType === 'specific'" class="form-line">
          <select
            id="gen-backgrounds"
            v-model="backgroundIndex"
            class="ms-select ms-select-100 mt-1"
          >
            <option v-for="(background, i) in backgrounds" :key="i" :value="i">
              {{ capitalizeFirst(background.name) }}
            </option>
          </select>
        </span>
        <!-- LEVEL -->
        <span class="form-line">
          <label class="ms-label" for="gen-level"
            >{{ $t("generator.form.level") }}:</label
          >
          <select
            id="gen-level"
            v-model="options.levelType"
            class="ms-select ms-select-100"
          >
            <option value="random">
              {{ $t("generator.form.levelRandom") }}
            </option>
            <option value="randomPeasantsMostly" selected>
              {{ $t("generator.form.levelLowMostly") }}
            </option>
          </select>
        </span>
        <!-- MISC OPTIONS -->
        <div class="mt-4">
          <MSCheckbox
            v-model="options.addVoice"
            :label="$t('generator.form.voice')"
          />
        </div>
      </fieldset>
      <!-- GENERATE MSButton -->
      <div class="generate-button text-center mt-5">
        <MSButton
          block
          color="primary"
          :text="t('generator.form.generate')"
          icon="fa-shuffle"
          @click.prevent="generateNpcThrottle"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {
  ObjectOrVariant,
  Background,
  createRandomNpcInputSchema,
} from "@/stores/generator.d";

import { capitalizeFirst, throttle } from "@/utils/functions";

const e = defineEmits(["close"]);
const p = defineProps({
  generate: {
    type: Boolean,
    default: false,
  },
});

const { t } = useI18n();
const {
  getRacesWithVariants,
  getClassesWithVariants,
  getBackgrounds,
  getRandomNpcs,
} = useGeneratorStore();

const races = ref<ObjectOrVariant[]>([]);
const classes = ref<ObjectOrVariant[]>([]);
const backgrounds = ref<Background[]>([]);

const primaryRaceIndex = ref(0);
const secondaryRaceIndex = ref(0);
const classIndex = ref(0);
const backgroundIndex = ref(0);

const primaryRacePercentage = ref(100);
const secondaryRacePercentage = ref(0);
const options = ref<createRandomNpcInputSchema>({
  classType: "randomAlways",
  backgroundType: "random",
  levelType: "randomPeasantsMostly",
  addVoice: true,
});

const generateNpcThrottle = throttle(generateNpc, 1000);

async function generateNpc() {
  prepareOptions();
  await getRandomNpcs(options.value);
}

function prepareOptions() {
  // primary race
  options.value.primaryRacePercentage = primaryRacePercentage.value;
  const race = races.value[primaryRaceIndex.value];
  options.value.primaryRaceId = race.id;
  if (race.variantId) {
    options.value.primaryRacevariantId = race.variantId;
  } else {
    delete options.value.primaryRacevariantId;
  }
  // secondary race
  options.value.secondaryRacePercentage = secondaryRacePercentage.value;
  const race2 = races.value[secondaryRaceIndex.value];
  options.value.secondaryRaceId = race2.id;
  if (race2.variantId) {
    options.value.secondaryRacevariantId = race2.variantId;
  } else {
    delete options.value.secondaryRacevariantId;
  }
  // class
  if (options.value.classType === "specific") {
    const classChosen = classes.value[classIndex.value];
    options.value.classId = classChosen.id;
    if (classes.value[classIndex.value].variantId) {
      options.value.classvariantId = classes.value[classIndex.value].variantId;
    }
  }
  if (options.value.backgroundType === "specific") {
    options.value.backgroundId = backgrounds.value[backgroundIndex.value].id;
  }
}

// TODO: 6) show user's own races, classes and professions at the top of the lists, and highlight them

watch(
  () => p.generate,
  () => {
    generateNpc();
  }
);

onMounted(async () => {
  races.value = await getRacesWithVariants();
  classes.value = await getClassesWithVariants();
  backgrounds.value = await getBackgrounds();
});
</script>

<style scoped lang="scss">
form-container {
  position: relative;
}
.button-settings {
  position: fixed;
}
.generator-form {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 400px;
  z-index: 100;
  @apply bg-background;
  @media (min-width: theme("screens.md")) {
    position: relative;
    display: block;
    padding: 0;
    border-radius: 0;
    background-color: transparent;
  }
}

.close-button {
  position: absolute;
  @apply top-4 right-4;
  @media (min-width: theme("screens.md")) {
    display: none;
  }
}
.generate-button {
  display: none;
  @media (min-width: theme("screens.md")) {
    display: block;
  }
}
</style>
