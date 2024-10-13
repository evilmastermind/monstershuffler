<template>
  <div class="background" :class="`background-${ui.currentThemeType}`">
    <!-- <div class="background-before" :class="[`bg-${ethical}-100`]" /> -->
    <div class="content p-3 md:p-5" :class="selectable ? 'selectable' : ''">
      <MonsterRoleplayStats hide-physical-appearance />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from "@/types";

const p = defineProps({
  selectable: {
    type: Boolean,
    default: false,
  },
  character: {
    type: Object as PropType<Character>,
    required: true,
  },
});

const ui = useUiStore();

const refCharacter = toRef(p, "character");

useProvideCharacter(refCharacter);
</script>

<style scoped>
.background {
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s;
  box-shadow: inset 0 0 10px theme("colors.background.200");
  @apply border border-background-300 rounded-xl;
}
.background:hover {
  @apply border-background-500 shadow;
}
.background-light {
  @apply bg-background-150;
}
.background-dark {
  @apply bg-background-150;
}
.content {
  height: 100%;
  font-family: "ScalaSansOffc", serif;
}
.selectable {
  @apply cursor-pointer rounded-xl;
}

.ethical-symbol {
  position: absolute;
  bottom: -100px;
  right: -200px;
  width: 500px;
}
.good {
  filter: hue-rotate(-120deg);
}
.evil {
}
.neutral {
  filter: hue-rotate(60deg);
}
</style>
