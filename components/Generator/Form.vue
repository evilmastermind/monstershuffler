<template>
  <div class="form-container">
    <form class="generator-form p-4 md:mr-4 rounded shadow-md md:shadow-none">
      <fieldset>
        <MSIconButton
          type="button"
          class="close-button"
          :label="$t('closeLabel')"
          icon="fa6-solid:xmark"
          @click="e('close')"
        />
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
            <label class="sr-only" for="gen-prace-perc">
              {{ $t("generator.form.primaryRacePercentage") }}
            </label>
            <select
              id="gen-prace-perc"
              v-model="options.primaryRacePercentage"
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
            <label class="sr-only" for="gen-srace-perc">
              {{ $t("generator.form.secondaryRacePercentage") }}
            </label>
            <select
              id="gen-srace-perc"
              v-model="options.secondaryRacePercentage"
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
            >{{ $t("generator.form.cr") }}:</label
          >
          <select
            id="gen-level"
            v-model="options.levelType"
            class="ms-select ms-select-100"
          >
            <option value="random">
              {{ $t("generator.form.crRandom") }}
            </option>
            <option value="randomPeasantsMostly" selected>
              {{ $t("generator.form.crLowMostly") }}
            </option>
          </select>
        </span>
        <!-- MISC OPTIONS -->
        <div class="misc-options mt-4">
          <MSCheckbox
            v-model="options.addVoice"
            :label="$t('generator.form.voice')"
          />
          <MSCheckbox
            v-model="options.includeChildren"
            :label="$t('generator.form.includeChildren')"
          />
          <MSCheckbox
            v-model="options.includeBodyType"
            :label="$t('generator.form.includeBodyType')"
          />
        </div>
      </fieldset>
      <!-- GENERATE -->
      <div class="generate-button text-center mt-5">
        <MSButton
          block
          color="primary"
          :text="t('generator.form.generate')"
          icon="fa6-solid:shuffle"
          :loading="isButtonLoading"
          :disabled="isButtonLoading"
          @click.prevent="e('generate')"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { capitalizeFirst } from "@/utils";

const e = defineEmits(["close", "generate"]);
const p = defineProps({
  generate: {
    type: Boolean,
    default: false,
  },
  isButtonLoading: {
    type: Boolean,
    default: false,
  },
});

const { t } = useI18n();
const generator = useGeneratorStore();
const user = useUserStore();

const {
  racesAndVariants: races,
  classesAndVariants: classes,
  backgrounds,
  primaryRaceIndex,
  secondaryRaceIndex,
  classIndex,
  backgroundIndex,
  options,
} = storeToRefs(generator);

function setClass(index: number) {
  const classChosen = classes.value[index];
  options.value.classId = classChosen.id;
  if (classes.value[index].variantId) {
    options.value.classvariantId = classes.value[index].variantId;
  }
}

// TODO: 6) show user's own races, classes and professions at the top of the lists, and highlight them

watch(
  primaryRaceIndex,
  (newValue) => {
    // primary race
    const race = races.value[newValue];
    options.value.primaryRaceId = race.id;
    if (race.variantId) {
      options.value.primaryRacevariantId = race.variantId;
    } else {
      delete options.value.primaryRacevariantId;
    }
  },
  { immediate: true }
);

watch(
  secondaryRaceIndex,
  (newValue) => {
    // secondary race
    const race2 = races.value[newValue];
    options.value.secondaryRaceId = race2.id;
    if (race2.variantId) {
      options.value.secondaryRacevariantId = race2.variantId;
    } else {
      delete options.value.secondaryRacevariantId;
    }
  },
  { immediate: true }
);

watch(
  classIndex,
  (newValue) => {
    setClass(newValue);
  },
  { immediate: true }
);

watch(
  backgroundIndex,
  (newValue) => {
    options.value.backgroundId = backgrounds.value[newValue].id;
  },
  { immediate: true }
);

watch(
  options,
  (newValue) => {
    if (newValue.backgroundType === "specific") {
      options.value.backgroundId = backgrounds.value[backgroundIndex.value].id;
    }
    if (newValue.classType === "specific") {
      setClass(classIndex.value);
    }
  },
  { deep: true }
);
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
  z-index: 9900;
  @apply bg-background-100;
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
.misc-options {
  display: inline-flex;
  flex-wrap: wrap;
  @apply gap-4;
}
</style>
