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
            <option value="specificClass">
              {{ $t("generator.form.classSpecific") }}
            </option>
            <option value="randomClass" selected>
              {{ $t("generator.form.classRandom") }}
            </option>
            <option value="randomClassProfession">
              {{ $t("generator.form.classAndProfession") }}
            </option>
            <option value="randomProfessionMostly">
              {{ $t("generator.form.classProfessionMostly") }}
            </option>
            <option value="randomProfession">
              {{ $t("generator.form.professionRandom") }}
            </option>
            <option value="specificProfession">
              {{ $t("generator.form.professionSpecific") }}
            </option>
          </select>
        </span>
        <span v-if="options.classType === 'specificClass'" class="form-line">
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
        <span
          v-if="options.classType === 'specificProfession'"
          class="form-line"
        >
          <select
            id="gen-professions"
            v-model="professionIndex"
            class="ms-select ms-select-100 mt-1"
          >
            <option v-for="(profession, i) in professions" :key="i" :value="i">
              {{ capitalizeFirst(profession.name) }}
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
      </fieldset>
      <!-- GENERATE MSButton -->
      <div class="generate-button text-center mt-5">
        <MSButton
          block
          color="primary"
          :text="t('generator.form.generate')"
          icon="fa-shuffle"
          @click.prevent="generateNpc"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {
  ObjectOrVariant,
  Profession,
  createRandomNpcInputSchema,
} from "@/stores/generator.d";

import { capitalizeFirst } from "@/utils/functions";

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
  getProfessions,
  getRandomNpc,
} = useGeneratorStore();

const races = ref<ObjectOrVariant[]>([]);
const classes = ref<ObjectOrVariant[]>([]);
const professions = ref<Profession[]>([]);

const primaryRaceIndex = ref(0);
const secondaryRaceIndex = ref(0);
const classIndex = ref(0);
const professionIndex = ref(0);

const primaryRacePercentage = ref(100);
const secondaryRacePercentage = ref(0);
const options = ref<createRandomNpcInputSchema>({
  classType: "randomClass",
  levelType: "randomPeasantsMostly",
});

async function generateNpc() {
  prepareOptions();
  const response = await getRandomNpc(options.value);
  if (response) {
    // alert(JSON.stringify(response, null, 2));
  }
}

function prepareOptions() {
  if (primaryRacePercentage.value > 0) {
    options.value.primaryRacePercentage = primaryRacePercentage.value;
    const race = races.value[primaryRaceIndex.value];
    options.value.primaryRaceId = race.id;
    if (race.variantId) {
      options.value.primaryRacevariantId = race.variantId;
    }
  }
  if (secondaryRacePercentage.value > 0) {
    options.value.secondaryRacePercentage = secondaryRacePercentage.value;
    const race = races.value[secondaryRaceIndex.value];
    options.value.secondaryRaceId = race.id;
    if (race.variantId) {
      options.value.secondaryRacevariantId = race.variantId;
    }
  }
  if (options.value.classType === "specificClass") {
    const classChosen = classes.value[classIndex.value];
    options.value.classId = classChosen.id;
    if (classes.value[classIndex.value].variantId) {
      options.value.classvariantId = classes.value[classIndex.value].variantId;
    }
  }
  if (options.value.classType === "specificProfession") {
    options.value.professionId = professions.value[professionIndex.value].id;
  }
}

// const professionList = ref([]);

// TODO: 1) handle login
// TODO: 2) test api/classes
// TODO: 3) link it to the frontend
// TODO: 5) save settings in localstorage
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
  professions.value = await getProfessions();
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
  background-color: theme("colors.background");
  width: 100%;
  max-width: 400px;
  z-index: 100;
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
  top: theme("spacing.4");
  right: theme("spacing.4");
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
