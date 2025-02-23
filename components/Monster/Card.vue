<template>
  <div class="background" :class="[background]">
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
      <button v-if="selectable" class="generate-button mt-2">
        {{ $t("generator.generateStats") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { exportRoleplayStats } from "monstershuffler-shared";
import type { GeneratorCharacter } from "@/types";

const e = defineEmits(["pin"]);
const p = defineProps({
  selectable: {
    type: Boolean,
    default: false,
  },
  generatorCharacter: {
    type: Object as PropType<GeneratorCharacter>,
    required: true,
  },
});

const ui = useUiStore();

const refGeneratorCharacter = toRef(p, "generatorCharacter");

useProvideCharacter(refGeneratorCharacter);

const background = computed(() => {
  switch (ui.currentThemeType) {
    case "light":
      return "background-light";
    case "dark":
      return "background-dark";
  }
});

function copyToClipboard() {
  const content = exportRoleplayStats(refGeneratorCharacter.value.object);
  navigator.clipboard.writeText(content);
}
</script>

<style scoped>
.background {
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s;
  @apply border border-inset-400 rounded;
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
  @apply bg-inset-200;
}
.background-dark {
  @apply bg-inset-200;
}
.generate-button {
  width: 100%;
  text-align: center;
  @apply border border-inset-400 rounded px-2 p-1;
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
