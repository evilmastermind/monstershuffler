<template>
  <div class="stat-block-container">
    <div class="border" :class="`border-${ui.currentThemeType}`" />
    <div class="stat-block" :class="`stat-block-${ui.currentThemeType}`">
      <div class="gradient" :class="`gradient-${ui.currentThemeType}`" />
      <div class="p-4 stat-block-content" :class="`columns-${columns}`">
        <MonsterStatBlockHeader />
        <MonsterStatBlockSeparator />
        <!-- ----- -->
        <MonsterStatBlockACHPSpeed />
        <MonsterStatBlockSeparator />
        <!-- ----- -->
        <MonsterStatBlockAbilityScores />
        <MonsterStatBlockSeparator />
        <!-- ----- -->
        <MonsterStatBlockSavesSkills />
        <MonsterStatBlockResistancesImmunities />
        <MonsterStatBlockSensesLanguages />
        <MonsterStatBlockChallengeProficiency />
        <MonsterStatBlockSeparator v-if="wordsCount" />
        <!-- ----- -->
        <MonsterStatBlockTraits />
        <MonsterStatBlockActions />
        <MonsterStatBlockBonusActions />
        <MonsterStatBlockReactions />
        <MonsterStatBlockLegendaryActions />
      </div>
    </div>
    <div class="border" :class="`border-${ui.currentThemeType}`" />
  </div>
</template>

<script setup lang="ts">
const ui = useUiStore();
const columnsFromActions = inject("columns") as Ref<number>;
const wordsCount = inject("wordsCount") as Ref<number>;

const p = defineProps({
  forceOneColumn: {
    type: Boolean,
    default: false,
  },
});

const columns = computed(() => {
  if (p.forceOneColumn) {
    return 1;
  }
  return columnsFromActions.value;
});
</script>

<style scoped lang="scss">
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
  background-image: url("@/assets/images/monster/sticks2.png");
}
.border-dark {
  background-image: url("@/assets/images/monster/sticks2-dark.png");
}
.stat-block {
  position: relative;
  margin: 0 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}
.stat-block:before {
  position: absolute;
  content: "";
  inset: 0;
  background-position: top left;
  background-repeat: repeat;
}
.stat-block-light:before {
  background-image: url("@/assets/images/monster/paper-texture.png");
  background-color: #fff8dc;
}
.stat-block-dark:before {
  background-image: url("@/assets/images/monster/paper-texture-dark.png");
  background-color: #000723;
}
.gradient {
  position: absolute;
  inset: 0;
  background-position: top left;
  background-repeat: repeat-x;
}
.gradient-light {
  background: url("@/assets/images/monster/semitransparent.png");
  background-repeat: repeat-x;
}
.gradient-dark {
  background: url("@/assets/images/monster/semitransparent-dark.png");
  background-repeat: repeat-x;
}
.stat-block-content {
  position: relative;
  font-family: ScalaSansOffc, Roboto, Helvetica, sans-serif;
  container-type: inline-size;
}
.columns-2 {
  columns: 2;
  column-gap: 2rem;
}
</style>
<style>
.action {
  margin: theme("spacing.2") 0;
  line-height: theme("spacing.5");
}
.spell-group {
}
</style>
