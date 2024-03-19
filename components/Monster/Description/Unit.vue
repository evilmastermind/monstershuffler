<template>
  <template v-if="part.type === 'ft'">
    {{
      $t(
        `units.${getUnitSymbol(unit)}`,
        feetToOtherUnit(part.number || 0, unit)
      )
    }}
  </template>
  <template v-else-if="part.type === 'feet'">
    {{ $t(`units.${unit}`, feetToOtherUnit(part.number || 0, unit)) }}
  </template>
  <template v-else-if="part.type === '-feet'">
    {{ $t(`units.-${unit}`, feetToOtherUnit(part.number || 0, unit)) }}
  </template>
  <template v-else-if="part.type === 'range/rangeMax'">
    {{
      $t("statBlock.range/rangeMax", {
        range: feetToOtherUnit(
          parseInt(part.translationVariables?.range || "20"),
          unit
        ),
        rangeMax: feetToOtherUnit(
          parseInt(part.translationVariables?.rangeMax || "20"),
          unit
        ),
        unit: getUnitSymbol(unit),
      })
    }}
  </template>
  <template v-else-if="part.type === 'range'">
    {{
      $t("statBlock.range", {
        range: feetToOtherUnit(
          parseInt(part.translationVariables?.range || "20"),
          unit
        ),
        unit: getUnitSymbol(unit),
      })
    }}
  </template>
  <template v-else-if="part.type === 'reach'">
    {{
      $t("statBlock.reach", {
        reach: feetToOtherUnit(
          parseInt(part.translationVariables?.reach || "20"),
          unit
        ),
        unit: getUnitSymbol(unit),
      })
    }}
  </template>
</template>

<script setup lang="ts">
import type { DescriptionPart } from "@/types";
import { feetToOtherUnit, getUnitSymbol } from "@/parsers";

const user = useUserStore();
const unit = computed(() => user.me?.settings?.stats?.lengthUnit || "feet");

const p = defineProps({
  part: {
    type: Object as PropType<DescriptionPart>,
    required: true,
  },
});
</script>

<style scoped></style>
