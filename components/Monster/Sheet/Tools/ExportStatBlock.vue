<template>
  <MSMenuList>
    <MSMenuItem
      :label="$t('statBlock.export.vtt')"
      @click="exportCharacterAs('VTT Foundry')"
    />
    <MSMenuItem
      :label="$t('statBlock.export.improvedInitiative')"
      @click="exportCharacterAs('Improved Initiative')"
    />
    <MSMenuItem
      :label="$t('statBlock.export.gmBinder')"
      @click="exportCharacterAs('GM Binder')"
    />
    <MSMenuItem
      :label="$t('statBlock.export.homebrewery')"
      @click="exportCharacterAs('Homebrewery V3')"
    />
  </MSMenuList>
</template>

<script setup lang="ts">
import {
  exportCharacterToGmBinder,
  exportCharacterToHomebreweryV3,
  exportCharacterToImprovedInitiative,
  exportCharacterToVTTFoundry,
} from "monstershuffler-shared";
import type { Character, MonsterExport } from "@/types";

const p = defineProps({
  hide: {
    type: Function,
    required: true,
  },
});

const statBlockExport = defineModel({
  type: Object as PropType<MonsterExport>,
  required: true,
});
const hasCopiedToClipboard = ref(false);

const character = inject("character") as ComputedRef<Character>;

function exportCharacterAs(type: MonsterExport["type"]) {
  p.hide();
  statBlockExport.value.isModalOpen = true;
  hasCopiedToClipboard.value = false;
  statBlockExport.value.type = type;
  switch (type) {
    case "VTT Foundry":
      statBlockExport.value.content = exportCharacterToVTTFoundry(
        character.value
      );
      break;
    case "Improved Initiative":
      statBlockExport.value.content = exportCharacterToImprovedInitiative(
        character.value
      );
      break;
    case "GM Binder":
      statBlockExport.value.content = exportCharacterToGmBinder(
        character.value
      );
      break;
    case "Homebrewery V3":
      statBlockExport.value.content = exportCharacterToHomebreweryV3(
        character.value
      );
      break;
  }
}
</script>

<style scoped></style>
