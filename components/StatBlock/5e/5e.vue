<template>
  <div
    :id="`monster-${character.id || 0}`"
    ref="statBlock"
    class="stat-block-container"
  >
    <div class="border" :class="[imageClasses.border]" />
    <div class="stat-block" :class="[imageClasses.paper]">
      <div class="gradient" :class="[imageClasses.gradient]" />
      <div :key="wrapper.key" class="stat-block-content p-4">
        <StatBlockColumns :columns-count="p.columnsCount">
          <StatBlock5eHeader />
          <StatBlockSeparator />
          <StatBlock5eAC />
          <StatBlock5eHP />
          <StatBlock5eSpeed />
          <StatBlockSeparator />
          <StatBlock5eAbilityScores />
          <StatBlockSeparator />
          <StatBlockSaves />
          <StatBlockSkills />
          <StatBlockResistancesImmunities />
          <StatBlockSensesLanguages />
          <StatBlock5eChallengeProficiency />
          <StatBlockSeparator v-if="wordsCount" />
          <StatBlockTraits />
          <StatBlockActions />
          <StatBlockBonusActions />
          <StatBlockReactions />
          <StatBlockLegendaryActions />
        </StatBlockColumns>
      </div>
    </div>
    <div class="border" :class="[imageClasses.border]" />
  </div>
</template>

<script setup lang="ts">
import type { Character, GeneratorCharacter } from "@/types";

const p = defineProps({
  columnsCount: {
    type: Number,
    default: 1,
  },
});

const ui = useUiStore();

const character = inject("character") as Ref<Character>;
const wordsCount = inject("wordsCount") as Ref<number>;
const wrapper = inject("wrapper") as Ref<GeneratorCharacter>;

const imageClasses = computed(() => {
  switch (ui.currentThemeType) {
    case "light":
      return {
        border: "border-light",
        paper: "stat-block-light",
        gradient: "gradient-light",
      };
    case "dark":
      return {
        border: "border-dark",
        paper: "stat-block-dark",
        gradient: "gradient-dark",
      };
  }
});
</script>

<style scoped>
.stat-block-content {
  position: relative;
  font-family: ScalaSansOffc, Roboto, Helvetica, sans-serif;
}
.stat-block-container {
  display: block;
}
.border {
  position: relative;
  height: 6px;
  border: 1px solid #000;
  background-position: top left;
  background-repeat: repeat;
}
.border-light {
  background-image: url("@/public/images/monster/sticks2.webp");
}
.border-dark {
  background-image: url("@/public/images/monster/sticks2-dark.webp");
}
.stat-block {
  position: relative;
  margin: 0 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  container-type: inline-size;
  @apply border-l border-l-background-300 border-r border-r-background-300;
}
.stat-block:before {
  position: absolute;
  content: "";
  inset: 0;
  background-position: top left;
  background-repeat: repeat;
}
.stat-block-light:before {
  background-image: url("@/public/images/monster/paper-texture.webp");
  background-color: #fff8dc;
}
.stat-block-dark:before {
  background-image: url("@/public/images/monster/paper-texture-dark.webp");
  background-color: #000723;
}
.gradient {
  position: absolute;
  inset: 0;
  background-position: top left;
  background-repeat: repeat-x;
}
.gradient-light {
  background: url("@/public/images/monster/semitransparent.webp");
  background-repeat: repeat-x;
}
.gradient-dark {
  background: url("@/public/images/monster/semitransparent-dark.webp");
  background-repeat: repeat-x;
}
</style>
