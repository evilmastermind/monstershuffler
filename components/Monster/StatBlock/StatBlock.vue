<template>
  <div ref="statBlock" class="stat-block-container" :id="`monster-${character.id || 0}`">
    <div class="border" :class="[imageClasses.border]" />
    <div class="stat-block" :class="[imageClasses.paper]">
      <div class="gradient" :class="[imageClasses.gradient]" />
      <div
        :key="wrapper.key"
        class="p-4 stat-block-content"
        :class="`columns-${columnsCount}`"
      >
        <MonsterStatBlockHeader />
        <MonsterStatBlockSeparator />
        <MonsterStatBlockACHPSpeed />
        <MonsterStatBlockSeparator />
        <MonsterStatBlockAbilityScores />
        <MonsterStatBlockSeparator />
        <MonsterStatBlockSavesSkills />
        <MonsterStatBlockResistancesImmunities />
        <MonsterStatBlockSensesLanguages />
        <MonsterStatBlockChallengeProficiency />
        <MonsterStatBlockSeparator v-if="wordsCount" />
        <MonsterStatBlockTraits />
        <MonsterStatBlockActions />
        <MonsterStatBlockBonusActions />
        <MonsterStatBlockReactions />
        <MonsterStatBlockLegendaryActions />
      </div>
    </div>
    <div class="border" :class="[imageClasses.border]" />
  </div>
</template>

<script setup lang="ts">
import type { GeneratorCharacter, Character } from "@/types";

type Columns = 1 | 2;

const p = defineProps({
  columns: {
    type: Number as PropType<Columns>,
    default: () => 2,
  },
});

const character = inject("character") as Ref<Character>;
const columnsFromActions = inject("columns") as Ref<number>;
const wordsCount = inject("wordsCount") as Ref<number>;
const wrapper = inject("wrapper") as Ref<GeneratorCharacter>;

const ui = useUiStore();
const generator = useGeneratorStore();

const { currentStatBlockHTMLElement } = storeToRefs(generator);
const statBlock = ref<HTMLElement | null>(null);

const columnsCount = computed(() => {
  if (p.columns) {
    return p.columns;
  }
  return columnsFromActions.value;
});
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

function scrollIntoView() {
  if (statBlock.value) {
    statBlock.value.scrollIntoView({ behavior: "smooth" });
  }
}

watch([columnsCount,columnsFromActions, () => p.columns], () => {
  scrollIntoView();
});

onMounted(() => {
  if (statBlock.value) {
    currentStatBlockHTMLElement.value = statBlock.value;
  }
});
</script>

<style scoped>
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
.stat-block-content {
  position: relative;
  font-family: ScalaSansOffc, Roboto, Helvetica, sans-serif;
}
.columns-2 {
  columns: 2;
  column-gap: 2rem;
}
@container (max-width: 500px) {
  .columns-2 {
    columns: 1;
  }
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
