<template>
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
</template>

<script setup lang="ts">
import { pushWithComma } from "@/parsers";
import type { Statistics } from "@/types";

const { t, te } = useI18n();
const user = useUserStore();

const statistics = inject("statistics") as ComputedRef<Statistics>;

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
</script>

<style scoped></style>
