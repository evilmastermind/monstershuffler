<template>
  <MonsterStatBlockStat v-if="savingThrowsString">
    <template #title> {{ $t("statBlock.savingThrows") }} </template>
    <template #default> {{ savingThrowsString }} </template>
  </MonsterStatBlockStat>
  <MonsterStatBlockStat v-if="skillsString">
    <template #title> {{ $t("statBlock.skills.skills") }} </template>
    <template #default> {{ skillsString }} </template>
  </MonsterStatBlockStat>
  <MonsterStatBlockStat v-if="vulnerabilities">
    <template #title> {{ $t("statBlock.vulnerabilities") }} </template>
    <template #default> {{ vulnerabilities }} </template>
  </MonsterStatBlockStat>
  <MonsterStatBlockStat v-if="resistances">
    <template #title> {{ $t("statBlock.resistances") }} </template>
    <template #default> {{ resistances }} </template>
  </MonsterStatBlockStat>
  <MonsterStatBlockStat v-if="immunities">
    <template #title> {{ $t("statBlock.immunities") }} </template>
    <template #default> {{ immunities }} </template>
  </MonsterStatBlockStat>
  <MonsterStatBlockStat v-if="conditionImmunities">
    <template #title> {{ $t("statBlock.conditionImmunities") }} </template>
    <template #default> {{ conditionImmunities }} </template>
  </MonsterStatBlockStat>
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
import type { Ability } from "@/parsers";

const { t, te } = useI18n();
const user = useUserStore();

const statistics = inject("statistics") as ComputedRef<Statistics>;

const unit = computed(() => user.me?.settings?.stats?.lengthUnit || "feet");

const savingThrowsString = computed(() => {
  let result = "";
  if (statistics.value?.savingThrows?.values) {
    for (const save in statistics.value.savingThrows.values) {
      const plusSign =
        statistics.value.savingThrows.values[save as Ability]! >= 0 ? "+" : "";
      result = pushWithComma(
        result,
        `${capitalizeFirst(
          t(`statBlock.abilities.${save}`)
        )} ${plusSign}${statistics.value.savingThrows.values[save as Ability]!}`
      );
    }
  }
  return result;
});

const skillsString = computed(() => {
  let result = "";
  if (statistics.value?.skills?.values) {
    for (const skill in statistics.value.skills.values) {
      const plusSign = statistics.value.skills.values[skill]! >= 0 ? "+" : "";
      result = pushWithComma(
        result,
        `${capitalizeFirst(
          t(`statBlock.skills.${skill}`)
        )} ${plusSign}${statistics.value.skills.values[skill]!}`
      );
    }
  }
  return result;
});

const vulnerabilities = computed(() => {
  let result = "";
  if (statistics.value?.vulnerabilities) {
    for (const stat of statistics.value.vulnerabilities) {
      result = pushWithComma(
        result,
        te(`statBlock.damageTypes.${stat.string}`)
          ? t(`statBlock.damageTypes.${stat.string}`)
          : stat.string
      );
    }
  }
  return result.toLowerCase();
});

const immunities = computed(() => {
  let result = "";
  if (statistics.value?.immunities) {
    for (const stat of statistics.value.immunities) {
      result = pushWithComma(
        result,
        te(`statBlock.damageTypes.${stat.string}`)
          ? t(`statBlock.damageTypes.${stat.string}`)
          : stat.string
      );
    }
  }
  return result.toLowerCase();
});

const resistances = computed(() => {
  let result = "";
  if (statistics.value?.resistances) {
    for (const stat of statistics.value.resistances) {
      result = pushWithComma(
        result,
        te(`statBlock.damageTypes.${stat.string}`)
          ? t(`statBlock.damageTypes.${stat.string}`)
          : stat.string
      );
    }
  }
  return result.toLowerCase();
});

const conditionImmunities = computed(() => {
  let result = "";
  if (statistics.value?.conditionImmunities) {
    for (const stat of statistics.value.conditionImmunities) {
      result = pushWithComma(
        result,
        te(`statBlock.damageTypes.${stat.string}`)
          ? t(`statBlock.damageTypes.${stat.string}`)
          : stat.string
      );
    }
  }
  return result.toLowerCase();
});

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
