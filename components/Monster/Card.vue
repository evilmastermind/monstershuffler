<template>
  <div class="background" :class="`background-${ui.currentThemeType}`">
    <!-- <div class="background-before" :class="[`bg-${ethical}-100`]" /> -->
    <div class="icons p-1">
      <MSIconButton
        v-if="selectable"
        class="pin p-1"
        icon="fa6-solid:clipboard"
        size="16"
        color="text-icon"
        :label="$t('copyToClipboard')"
        @click.stop="copyToClipboard"
      />
      <MSIconButton
        v-if="selectable"
        class="pin p-1"
        icon="fluent:pin-12-filled"
        size="16"
        color="text-icon"
        :label="$t('pin')"
        @click.stop="e('pin')"
      />
    </div>
    <div class="content p-3 md:p-5" :class="selectable ? 'selectable' : ''">
      <MonsterRoleplayStats hide-physical-appearance />
    </div>
  </div>
</template>

<script setup lang="ts">
import { exportRoleplayStats } from "monstershuffler-shared";
import type { Character } from "@/types";

const e = defineEmits(["pin"]);
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

function copyToClipboard() {
  const content = exportRoleplayStats(refCharacter.value);
  navigator.clipboard.writeText(content);
}
</script>

<style scoped>
.background {
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s;
  box-shadow: inset 0 0 10px theme("colors.background.200");
  @apply border border-background-300 rounded-xl;
}
.icons {
  position: relative;
  float: right;
  z-index: 1;
  cursor: pointer;
  display: flex;
  @apply text-text-icon/30 gap-1;
}
.background:hover .pin {
  display: auto;
  @apply text-text-icon/50;
}

.background:hover .pin:hover {
  @apply text-text-icon;
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
  position: relative;
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
