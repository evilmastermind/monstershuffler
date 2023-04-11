<template>
  <BackgroundDice />
  <div class="lg-max">
    <h1 class="sm-only mb-4">
      {{ $t("generator.title") }}
    </h1>
    <div class="mode-toggler mb-4">
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
                    v-model="primaryRace"
                    class="ms-select ms-select-75"
                  >
                    <option selected>An option.</option>
                  </select>
                  <select
                    id="gen-prace-perc"
                    v-model="primaryRacePercentage"
                    class="ms-select ms-select-20"
                  >
                    <option value="0">0%</option>
                    <option value="5">5%</option>
                    <option value="10">10%</option>
                    <option value="15">15%</option>
                    <option value="20">20%</option>
                    <option value="25">25%</option>
                    <option value="30">30%</option>
                    <option value="35">35%</option>
                    <option value="40">40%</option>
                    <option value="45">45%</option>
                    <option value="50" selected>50%</option>
                    <option value="55">55%</option>
                    <option value="60">60%</option>
                    <option value="65">65%</option>
                    <option value="70">70%</option>
                    <option value="75">75%</option>
                    <option value="80">80%</option>
                    <option value="85">85%</option>
                    <option value="90">90%</option>
                    <option value="95">95%</option>
                    <option value="100">100%</option>
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
                    v-model="secondaryRace"
                    class="ms-select ms-select-75"
                  >
                    <option selected>An option.</option>
                  </select>
                  <select
                    id="gen-srace-perc"
                    v-model="secondaryRacePercentage"
                    class="ms-select ms-select-20"
                  >
                    <option value="0">0%</option>
                    <option value="5">5%</option>
                    <option value="10">10%</option>
                    <option value="15">15%</option>
                    <option value="20">20%</option>
                    <option value="25">25%</option>
                    <option value="30">30%</option>
                    <option value="35">35%</option>
                    <option value="40">40%</option>
                    <option value="45" selected>45%</option>
                    <option value="50">50%</option>
                    <option value="55">55%</option>
                    <option value="60">60%</option>
                    <option value="65">65%</option>
                    <option value="70">70%</option>
                    <option value="75">75%</option>
                    <option value="80">80%</option>
                    <option value="85">85%</option>
                    <option value="90">90%</option>
                    <option value="95">95%</option>
                    <option value="100">100%</option>
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
                  v-model="classIdChosen"
                  class="ms-select ms-select-100 mt-1"
                >
                  <option v-for="(aClass, i) in classList" :key="i" :value="i">
                    {{ aClass.name }}
                    {{ aClass.variantName ? ` (${aClass.variantName})` : "" }}
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
import { useApiStore } from "@/stores/api";

const modeBoolean = ref(true);
const mode = computed(() => (modeBoolean.value ? "form" : "prompt"));
const { t } = useI18n();
const { getClasses } = useApiStore();

const prompt = ref("");
const primaryRace = ref("");
const primaryRacePercentage = ref(100);
const secondaryRace = ref("");
const secondaryRacePercentage = ref(0);
const classType = ref("randomClass");
const classIdChosen = ref(0);
// const levelType = ref("randomPeasantsMostly");
// const raceList = ref([]);
const classList = ref([]);
// const professionList = ref([]);

// TODO : 0) fix ts inside .vue files
// TODO: 1) handle login
// TODO: 2) test api/classes
// TODO: 3) link it to the frontend
// TODO: 3.5) find why the classes' names are returned between quotes
// TODO: 4) find a way to export the types from the API
// TODO: 5) save settings in localstorage
// TODO: 6) show user's own races, classes and professions at the top of the lists, and highlight them

// const {
//   data: classes,
//   pending,
//   error,
//   refresh,
// } = await getClasses();

onMounted(async () => {
  const classes = await getClasses();
  classes.forEach((aClass) => {
    if (
      Object.hasOwn(aClass, "other_objects") &&
      aClass.other_objects.length > 0
    ) {
      aClass.other_objects.forEach((otherObject) => {
        classList.value.push({
          id: aClass.id,
          name: aClass.name,
          userId: aClass.userid,
          variantId: otherObject.id,
          variantName: otherObject.name,
          variantUserId: otherObject.userid,
        });
      });
    } else {
      classList.value.push({
        id: aClass.id,
        name: aClass.name,
        userId: aClass.userid,
      });
    }
  });
});
</script>

<style lang="scss" scoped>
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
