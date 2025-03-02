<template>
  <div class="background" :class="[background]">
    <!-- <div class="background-before" :class="[`bg-${ethical}-100`]" /> -->

    <div class="content p-3 md:p-5" :class="selectable ? 'selectable' : ''">
      <div>
        <div class="icons pb-1">
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
            @click.stop="pinCharacter"
          />
        </div>
        <MonsterRoleplayStats hide-physical-appearance />
      </div>
      <button v-if="selectable" class="view-button" @click="openCharacterSheet">
        {{ $t("generator.generateStats") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { exportRoleplayStats } from "monstershuffler-shared";
import type { NpcDetails } from "monstershuffler-shared";
import type { GeneratorCharacter } from "@/types";

const p = defineProps({
  selectable: {
    type: Boolean,
    default: false,
  },
  generatorCharacter: {
    type: Object as PropType<GeneratorCharacter>,
    required: true,
  },
  index: {
    type: Number,
    default: undefined,
  },
});

const ui = useUiStore();
const generator = useGeneratorStore();

const refGeneratorCharacter = toRef(p, "generatorCharacter");
const { session } = storeToRefs(generator);

useProvideCharacter(refGeneratorCharacter);

function openCharacterSheet() {
  if (p.index === undefined) {
    return;
  }
  const npc = session.value[p.index];
  generator.pushNewCharacter(npc as NpcDetails, true);
}

function pinCharacter() {
  if (p.index === undefined) {
    return;
  }
  const npc = session.value[p.index];
  generator.pushNewCharacter(npc as NpcDetails, false);
}

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
  position: absolute;
  right: 0;
  top: 0;
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
.view-button {
  width: 100%;
  text-align: center;
  @apply border border-background-500 border-solid rounded px-2 p-1;
}
.view-button:hover {
  @apply border-background-600 bg-background-200;
}
.content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  font-family: "ScalaSansOffc", serif;
  @apply gap-4;
}
.selectable {
  @apply rounded-xl;
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
