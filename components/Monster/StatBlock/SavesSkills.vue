<template>
  <MonsterStatBlockStat v-if="savingThrowsString">
    <template #title> {{ $t("statBlock.savingThrows") }} </template>
    <template #default> {{ savingThrowsString }} </template>
  </MonsterStatBlockStat>
  <MonsterStatBlockStat v-if="skillsString">
    <template #title> {{ $t("statBlock.skills.skills") }} </template>
    <template #default> {{ skillsString }} </template>
  </MonsterStatBlockStat>
</template>

<script setup lang="ts">
import { pushWithComma } from "@/parsers";
import type { Statistics } from "@/types";
import type { Ability } from "@/parsers";

const { t } = useI18n();

const statistics = inject("statistics") as ComputedRef<Statistics>;

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
</script>

<style scoped></style>
