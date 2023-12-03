<template>
  <MonsterStatBlockStat v-if="senses">
    <template #title>
      {{ $t("statBlock.senses.senses") }}
    </template>
    <template #default> {{ senses }} </template>
  </MonsterStatBlockStat>
  <MonsterStatBlockStat v-if="languages">
    <template #title> {{ $t("statBlock.languages.languages") }} </template>
    <template #default> {{ languages }} </template>
  </MonsterStatBlockStat>
</template>

<script setup lang="ts">
import {
  unshiftWithComma,
  pushWithComma,
  feetToOtherUnit,
  getUnitSymbol,
} from "@/parsers";
import type { Statistics } from "@/types";

const { t, te } = useI18n();
const user = useUserStore();

const statistics = inject("statistics") as ComputedRef<Statistics>;

const unit = computed(() => user.me?.settings?.stats?.lengthUnit || "feet");

const senses = computed(() => {
  let result = "";
  const isBlind = statistics.value?.isBlind || false;
  let alternativeSense = "";
  let mostPowerfulSense = 0;

  if (isBlind) {
    alternativeSense = "just blind";
    if (Object.hasOwn(statistics.value?.senses!.values, "blindsight")) {
      alternativeSense = "blindsight";
      mostPowerfulSense = statistics.value?.senses!.values.blindsight;
    }
    if (Object.hasOwn(statistics.value?.senses!.values, "tremorsense")) {
      if (statistics.value?.senses!.values.tremorsense > mostPowerfulSense) {
        alternativeSense = "tremorsense";
        mostPowerfulSense = statistics.value?.senses!.values.tremorsense;
      }
    }
  }

  for (const sense in statistics.value?.senses!.values) {
    if (sense === "passive Perception") {
      result = pushWithComma(
        result,
        `${t(`statBlock.senses.${sense}`)} ${
          statistics.value?.senses!.values[sense]
        }`
      );
    } else {
      const senseName = te(`statBlock.senses.${sense}`)
        ? t(`statBlock.senses.${sense}`)
        : sense;
      result = pushWithComma(
        result,
        `${senseName} ${feetToOtherUnit(
          statistics.value?.senses!.values[sense],
          unit.value
        )} ${getUnitSymbol(unit.value)}`
      );
      if (sense === alternativeSense) {
        result += ` (${t("statBlock.senses.blindBeyond")})`;
      }
    }
  }

  if (alternativeSense === "just blind") {
    result = unshiftWithComma(result, t("statBlock.senses.blind"));
  }
  return result;
});

const languages = computed(() => {
  let result = "";
  if (statistics.value?.languages?.values) {
    for (const language of statistics.value.languages?.values) {
      result = pushWithComma(
        result,
        te(`statBlock.languages.${language.string}`)
          ? t(`statBlock.languages.${language.string}`)
          : language.string
      );
    }
  }
  if (statistics.value.canSpeak === false) {
    if (result) {
      result = `
      ${t("statBlock.languages.understands")} ${result} ${t(
        "statBlock.languages.butCantSpeak"
      )}`;
    } else {
      result = t("statBlock.languages.cantSpeak");
    }
  }
  if (statistics.value.telepathy) {
    result = pushWithComma(
      result,
      `${t("statBlock.languages.telepathy")} ${feetToOtherUnit(
        statistics.value.telepathy,
        unit.value
      )} ${getUnitSymbol(unit.value)}`
    );
  }

  if (!result) {
    result = "—";
  }
  return result;
});
</script>

<style scoped></style>
