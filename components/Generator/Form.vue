<template>
  <div class="form-container">
    <form class="generator-form rounded shadow-md md:shadow-none">
      <MSIconButton
        type="button"
        class="close-button p-1 m-2"
        :label="$t('closeLabel')"
        icon="fa6-solid:xmark"
        @click="e('close')"
      />
      <fieldset class="ms-fieldset mt-2 md:mt-0">
        <!-- PRIMARY AND SECONDARY RACES -->
        <span class="form-line">
          <label class="ms-label" for="gen-prace"
            >{{ $t("generator.form.primaryRace") }}:</label
          >
          <div class="flex items-center justify-between gap-1">
            <select
              id="gen-prace"
              v-model="primaryRaceIndex"
              class="ms-input-style ms-select ms-select-75"
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
              v-model="settings.options.primaryRacePercentage"
              class="ms-input-style ms-select ms-select-20"
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
              class="ms-input-style ms-select ms-select-75"
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
              v-model="settings.options.secondaryRacePercentage"
              class="ms-input-style ms-select ms-select-20"
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
            v-model="settings.options.classType"
            class="ms-input-style ms-select ms-select-100"
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
        <span v-if="settings.options.classType === 'specific'" class="form-line">
          <select
            id="gen-classes"
            v-model="classIndex"
            class="ms-input-style ms-select ms-select-100 mt-1"
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
            v-model="settings.options.backgroundType"
            class="ms-input-style ms-select ms-select-100"
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
        <span v-if="settings.options.backgroundType === 'specific'" class="form-line">
          <select
            id="gen-backgrounds"
            v-model="backgroundIndex"
            class="ms-input-style ms-select ms-select-100 mt-1"
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
            v-model="settings.options.levelType"
            class="ms-input-style ms-select ms-select-100"
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
        <div class="misc-options">
          <MSCheckbox
            v-model="settings.options.addVoice"
            :label="$t('generator.form.voice')"
          />
          <MSCheckbox
            v-model="settings.options.includeChildren"
            :label="$t('generator.form.includeChildren')"
          />
          <MSCheckbox
            v-model="settings.options.includeBodyType"
            :label="$t('generator.form.includeBodyType')"
          />
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
import { capitalizeFirst } from "@/utils";

const e = defineEmits(["close", "generate"]);
const generator = useGeneratorStore();

const {
  racesAndVariants: races,
  classesAndVariants: classes,
  backgrounds,
  primaryRaceIndex,
  secondaryRaceIndex,
  classIndex,
  backgroundIndex,
  settings,
} = storeToRefs(generator);

function setClass(index: number) {
  const classChosen = classes.value[index];
  if (!classChosen) {
    return;
  }
  settings.value.options.classId = classChosen.id;
  if (classes.value[index].variantId) {
    settings.value.options.classvariantId = classes.value[index].variantId;
  }
}

// TODO: 6) show user's own races, classes and professions at the top of the lists, and highlight them

watch(
  primaryRaceIndex,
  (newValue) => {
    // primary race
    const race = races.value[newValue];
    if (!race) {
      return;
    }
    settings.value.options.primaryRaceId = race.id;
    if (race.variantId) {
      settings.value.options.primaryRacevariantId = race.variantId;
    } else {
      delete settings.value.options.primaryRacevariantId;
    }
  },
  { immediate: true }
);

watch(
  secondaryRaceIndex,
  (newValue) => {
    // secondary race
    const race2 = races.value[newValue];
    if (!race2) {
      return;
    }
    settings.value.options.secondaryRaceId = race2.id;
    if (race2.variantId) {
      settings.value.options.secondaryRacevariantId = race2.variantId;
    } else {
      delete settings.value.options.secondaryRacevariantId;
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
    const background = backgrounds.value[newValue];
    if (!background) {
      return;
    }
    settings.value.options.backgroundId = background.id;
  },
  { immediate: true }
);

watch(
  settings,
  (newValue) => {
    if (newValue.options.backgroundType === "specific") {
      settings.value.options.backgroundId = backgrounds.value[backgroundIndex.value].id;
    }
    if (newValue.options.classType === "specific") {
      setClass(classIndex.value);
    }
  },
  { deep: true }
);
</script>

<style scoped>
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
  width: 100vw;
  max-width: 400px;
  z-index: 9900;
  @apply bg-background-100 shadow-2xl p-4;
}
.close-button {
  position: absolute;
  top: 0;
  right: 0;
}
.misc-options {
  display: inline-flex;
  flex-wrap: wrap;
  @apply gap-4;
}

@media (min-width: theme("screens.md")) {
  .generator-form {
    position: relative;
    width: 100%;
    display: block;
    padding: 0;
    border-radius: 0;
    background-color: transparent;
    z-index: 1;
    @apply shadow-none;
  }
  .close-button {
    display: none;
  }
}
</style>
