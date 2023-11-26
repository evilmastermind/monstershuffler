<template>
  <MonsterStatBlockStat>
    <template #title> {{ $t("statBlock.AC") }} </template>
    <template #default> {{ statistics?.AC.string }} </template>
  </MonsterStatBlockStat>
  <MonsterStatBlockStat>
    <template #title> {{ $t("statBlock.HP") }} </template>
    <template #default> {{ statistics?.HP.string }} </template>
  </MonsterStatBlockStat>
  <MonsterStatBlockStat v-if="statistics?.speeds?.string">
    <template #title> {{ $t("statBlock.speed.speed") }} </template>
    <template #default> {{ speedString }} </template>
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

const { t } = useI18n();
const user = useUserStore();

const statistics = inject("statistics") as ComputedRef<Statistics>;

const speedString = computed(() => {
  let result = "";
  if (statistics.value?.speeds?.values) {
    for (const key in statistics.value.speeds.values) {
      result = addSpeedToString(
        result,
        // @ts-expect-error - key is a valid key of statistics
        statistics.value.speeds.values[key],
        key,
        user.me?.settings?.stats?.lengthUnit || "feet"
      );
    }
  }
  return result;
});

function addSpeedToString(
  speedString: string,
  speedNumber: number,
  type: string,
  unit = "feet"
) {
  let result = speedString;
  switch (type) {
    case "walk":
      result = unshiftWithComma(
        result,
        `${feetToOtherUnit(speedNumber, unit)} ${getUnitSymbol(unit)}`
      );
      break;
    case "fly":
      result = pushWithComma(
        result,
        `${t("statBlock.speed.fly")} ${feetToOtherUnit(
          speedNumber,
          unit
        )} ${getUnitSymbol(unit)}`
      );
      break;
    case "climb":
      result = pushWithComma(
        result,
        `${t("statBlock.speed.climb")} ${feetToOtherUnit(
          speedNumber,
          unit
        )} ${getUnitSymbol(unit)}`
      );
      break;
    case "swim":
      result = pushWithComma(
        result,
        `${t("statBlock.speed.swim")} ${feetToOtherUnit(
          speedNumber,
          unit
        )} ${getUnitSymbol(unit)}`
      );
      break;
    case "burrow":
      result = pushWithComma(
        result,
        `${t("statBlock.speed.burrow")} ${feetToOtherUnit(
          speedNumber,
          unit
        )} ${getUnitSymbol(unit)}`
      );
      break;
    case "hover":
      result = pushWithComma(
        result,
        `${t("statBlock.speed.fly")} ${feetToOtherUnit(
          speedNumber,
          unit
        )} ${getUnitSymbol(unit)} (${t("statBlock.speed.hover")})`
      );
      break;
  }
  return result;
}
</script>

<style scoped></style>
