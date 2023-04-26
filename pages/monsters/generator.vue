<template>
  <!-- <BackgroundDice /> -->
  <div class="bg-test">
    <div class="bg-test-image" />
  </div>
  <div class="lg-max">
    <div class="background-navbar-padding" />
    <h1 class="mb-4 text-shadow">
      {{ $t("generator.title") }}
    </h1>
    <!-- <div class="text-shadow text-max">
      <p v-html="t('generator.description1')" />
      <p v-html="t('generator.description2')" />
    </div> -->
    <div class="mode-toggler mt-6 my-4">
      <label class="cursor-pointer">
        <MSSlider2 v-model:is-enabled="modeBoolean" />
        <h4 class="ml-2 inline">{{ $t(`generator.${mode}ModeTitle`) }}</h4>
      </label>
      <!-- <p>{{ $t(`generator.${mode}ModeDescription`)  }}</p> -->
    </div>
    <div class="grid">
      <Transition name="scroll-right" mode="out-in">
        <MSCard v-if="mode === 'prompt'" class="prompt mb-4">
          <input
            v-model="prompt"
            type="text"
            class="ms-input w-100"
            :placeholder="t('generator.prompt.placeholder')"
          />
        </MSCard>
        <MSCard v-else class="box form">
          <form>
            <fieldset>
              <!-- PRIMARY AND SECONDARY RACES -->
              <span class="form-line">
                <label class="ms-label" for="gen-prace"
                  >{{ $t("generator.form.primaryRace") }}:</label
                >
                <div class="flex-row justify-space-between">
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
                    <option
                      v-for="index in 21"
                      :key="index"
                      :value="(index - 1) * 5"
                    >
                      {{ `${(index - 1) * 5}%` }}
                    </option>
                  </select>
                </div>
              </span>
              <span class="form-line">
                <label class="ms-label" for="gen-srace"
                  >{{ $t("generator.form.secondaryRace") }}:</label
                >
                <div class="flex-row justify-space-between">
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
                    <option
                      v-for="index in 21"
                      :key="index"
                      :value="(index - 1) * 5"
                    >
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
                  v-model="classType"
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
              <span v-if="classType === 'specificClass'" class="form-line">
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
              <span v-if="classType === 'specificProfession'" class="form-line">
                <select
                  id="gen-professions"
                  v-model="professionIndex"
                  class="ms-select ms-select-100 mt-1"
                >
                  <option
                    v-for="(profession, i) in professions"
                    :key="i"
                    :value="i"
                  >
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
                  class="ms-select ms-select-100"
                  onchange="saveSettings()"
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
            <div class="center pt-5">
              <MSButton color="primary" :text="t('generator.form.generate')" />
            </div>
          </form>
        </MSCard>
      </Transition>
      <div class="npcs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { capitalizeFirst } from "@/utils/functions";
import { useGeneratorStore } from "@/stores/generator.js";
import { ObjectOrVariant, Profession } from "@/types/generator";

const modeBoolean = ref(true);
const mode = computed(() => (modeBoolean.value ? "form" : "prompt"));
const { t } = useI18n();
const { getRacesWithVariants, getClassesWithVariants, getProfessions } =
  useGeneratorStore();

const prompt = ref("");

const races = ref<ObjectOrVariant[]>([]);
const classes = ref<ObjectOrVariant[]>([]);
const professions = ref<Profession[]>([]);

const primaryRaceIndex = ref(0);
const secondaryRaceIndex = ref(0);
const classIndex = ref(0);
const professionIndex = ref(0);

const primaryRacePercentage = ref(100);
const secondaryRacePercentage = ref(0);
const classType = ref("randomClass");
// const levelType = ref("randomPeasantsMostly");
// const raceList = ref([]);

// const professionList = ref([]);

// TODO: 1) handle login
// TODO: 2) test api/classes
// TODO: 3) link it to the frontend
// TODO: 5) save settings in localstorage
// TODO: 6) show user's own races, classes and professions at the top of the lists, and highlight them

// const {
//   data: classes,
//   pending,
//   error,
//   refresh,
// } = await getClasses();

onMounted(async () => {
  races.value = await getRacesWithVariants();
  classes.value = await getClassesWithVariants();
  professions.value = await getProfessions();
});
</script>

<style lang="scss" scoped>
.background-navbar-padding {
  width: calc(100vw - (100vw - 100%));
  height: $s-9;
}
.bg-test {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  @include themed() {
    background-color: t($background2);
    background: rgba(t($background2), 0.7)
      url("@/assets/images/generator-bg-1.jpg") no-repeat center center/cover;
    background-blend-mode: t($background-blend-mode);
  }
  //  ;
  z-index: -2;
}

.box {
  max-width: $s-13;
  // background-color: rgb(red, 0.2);
}

.grid {
  display: grid;
  grid-template-areas:
    "form prompt"
    "form npcs";
  grid-template-columns: max-content auto;
  overflow-x: hidden;
  @include md {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.prompt {
  grid-area: prompt;
  width: 100%;
  height: fit-content;
}
.mode-toggler {
  @include md {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
.form {
  grid-area: form;
  margin-right: $s-2;
  @include md {
    margin-right: 0;
  }
}
</style>
