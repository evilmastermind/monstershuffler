<template>
  <form class="flex flex-col gap-4">
    <UFormField :label="$t('generator.form.primaryRace')">
      <div class="grid grid-cols-[70%_30%]">
        <label class="mr-1">
          <span class="sr-only"> {{ $t("generator.form.primaryRace") }} </span>
          <USelect
            class="w-full"
            v-model="primaryRaceIndex"
            :items="computedRaces"
          />
        </label>
        <label>
          <span class="sr-only">
            {{ $t("generator.form.primaryRacePercentage") }}
          </span>
          <USelect
            class="w-full"
            v-model="settings.options.primaryRacePercentage"
            :items="percentages"
          />
        </label>
      </div>
    </UFormField>
    <UFormField :label="$t('generator.form.secondaryRace')">
      <div class="grid grid-cols-[70%_30%]">
        <label class="mr-1">
          <span class="sr-only">
            {{ $t("generator.form.secondaryRace") }}
          </span>
          <USelect
            class="w-full"
            v-model="secondaryRaceIndex"
            :items="computedRaces"
          />
        </label>
        <label>
          <span class="sr-only">
            {{ $t("generator.form.secondaryRacePercentage") }}
          </span>
          <USelect
            class="w-full"
            v-model="settings.options.secondaryRacePercentage"
            :items="percentages"
          />
        </label>
      </div>
    </UFormField>
    <UFormField :label="$t('generator.form.class')">
      <USelect
        v-model="settings.options.classType"
        :items="classTypes"
        class="w-full"
      />
    </UFormField>
    <UFormField v-if="settings.options.classType === 'specific'">
      <USelect
        v-model="classIndex"
        :items="computedClasses"
        class="w-full"
        :aria-label="$t('generator.form.class')"
      />
    </UFormField>
    <UFormField :label="$t('generator.form.background')">
      <USelect
        v-model="settings.options.backgroundType"
        :items="backgroundTypes"
        class="w-full"
      />
    </UFormField>
    <UFormField v-if="settings.options.backgroundType === 'specific'">
      <USelect
        v-model="backgroundIndex"
        :items="computedBackgrounds"
        class="w-full"
        :aria-label="$t('generator.form.class')"
      />
    </UFormField>
    <div class="flex gap-4 flex-wrap">
      <UCheckbox
        color="neutral"
        v-model="settings.options.addVoice"
        :label="$t('generator.form.voice')"
      />
      <UCheckbox
        color="neutral"
        v-model="settings.options.includeBodyType"
        :label="$t('generator.form.includeBodyType')"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { capitalizeFirst } from "@/utils";

const e = defineEmits(["close", "generate"]);

const { t } = useI18n();
const generator = useGeneratorStore();

let percentages: {
  value: number;
  label: string;
}[] = [];

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

const computedRaces = computed(() => {
  return races.value.map((race, index) => ({
    value: index,
    label: `${race.name}${race.variantName ? ` (${race.variantName})` : ""}`,
  }));
});
const classTypes = computed(() => [
  {
    value: "none",
    label: t("generator.form.none"),
  },
  {
    value: "randomSometimes",
    label: t("generator.form.randomSometimes"),
  },
  {
    value: "randomAlways",
    label: t("generator.form.randomAlways"),
  },
  {
    value: "specific",
    label: t("generator.form.specific"),
  },
]);
const computedClasses = computed(() => {
  return classes.value.map((classItem, index) => ({
    value: index,
    label: `${classItem.name}${classItem.variantName ? ` (${classItem.variantName})` : ""}`,
  }));
});
const backgroundTypes = computed(() => [
  {
    value: "none",
    label: t("generator.form.none"),
  },
  {
    value: "random",
    label: t("generator.form.random"),
  },
  {
    value: "specific",
    label: t("generator.form.specific"),
  },
]);
const computedBackgrounds = computed(() => {
  return backgrounds.value.map((background, index) => ({
    value: index,
    label: background.name,
  }));
});

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
  { immediate: true },
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
  { immediate: true },
);

watch(
  classIndex,
  (newValue) => {
    setClass(newValue);
  },
  { immediate: true },
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
  { immediate: true },
);

watch(
  settings,
  (newValue) => {
    if (newValue.options.backgroundType === "specific") {
      settings.value.options.backgroundId =
        backgrounds.value[backgroundIndex.value].id;
    }
    if (newValue.options.classType === "specific") {
      setClass(classIndex.value);
    }
  },
  { deep: true },
);

onBeforeMount(() => {
  percentages = [];
  for (let i = 1; i < 21; i++) {
    const increment = i * 5;
    percentages.push({
      value: increment,
      label: `${increment}%`,
    });
  }
});
</script>

<style scoped></style>
