<template>
  <div class="stat-block-container">
    <div class="border" :class="`border-${currentThemeType}`" />
    <div class="stat-block" :class="`stat-block-${currentThemeType}`">
      <div class="gradient" :class="`gradient-${currentThemeType}`" />
      <div class="stat-block-content p-4">
        <MonsterStatBlockHeader :character="character" :moral="moral" />
      </div>
    </div>
    <div class="border" :class="`border-${currentThemeType}`" />
  </div>
</template>

<script setup lang="ts">
import type { Character } from "@/types";

const p = defineProps({
  character: {
    type: Object as PropType<Character>,
    required: true,
  },
});

const ui = useUiStore();
const { themes } = ui;
const { currentThemeType } = storeToRefs(ui);

const moral = computed(() => {
  if (p.character?.statistics?.alignment?.array?.includes("Good")) {
    return "text-text-good fill-background-good";
  } else if (p.character?.statistics?.alignment?.array?.includes("Evil")) {
    return "text-text-evil fill-background-evil";
  } else {
    return "text-text-neutral fill-background-neutral";
  }
});
</script>

<style scoped lang="scss">
.border {
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
}
.gradient-dark {
  background: url("@/assets/images/monster/semitransparent-dark.png");
}
.stat-block-content {
  position: relative;
  font-family: ScalaSansOffc, Roboto, Helvetica, sans-serif;
}
</style>
