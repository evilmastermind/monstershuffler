<template>
  <div>
    <VMenu :triggers="['hover', 'click', 'focus', 'touch']" placement="bottom">
      <MSIconButton
        :label="$t('monsterSheet.export')"
        icon="fa6-solid:file-export"
      />
      <template #popper>
        <MSMenuList>
          <VMenu
            :triggers="['hover', 'click', 'focus', 'touch']"
            placement="right"
          >
            <MSMenuItem
              :label="$t('statBlock.export.statBlockAs')"
              icon="bi:file-text-fill"
              :is-sub-menu="true"
            />
            <template #popper>
              <div class="menu-list">
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
              </div>
            </template>
          </VMenu>
        </MSMenuList>
      </template>
    </VMenu>
    <MSModal
      v-if="isStatBlockExportModalOpen"
      @close="isStatBlockExportModalOpen = false"
    >
      <template #title>
        {{ $t(`statBlock.export.exportModalTitle`) }}
      </template>
      <template #default>
        <p class="content">
          {{ $t("statBlock.export.exportedAs") }} {{ exportedStatBlockType }}.
        </p>
        <textarea v-model="exportedStatBlock" class="statblock-textarea mt-4" />
        <MSButton
          block
          class="mt-4"
          :color="hasCopiedToClipboard ? 'success' : 'dark'"
          icon="fa6-solid:clipboard"
          :text="hasCopiedToClipboard ? $t('copied') : $t('copyToClipboard')"
          @click="copyToClipboard()"
        />
        <MSButton
          block
          class="mt-2"
          :text="$t('close')"
          @click="isStatBlockExportModalOpen = false"
        />
      </template>
    </MSModal>
  </div>
</template>

<script setup lang="ts">
import {
  exportCharacterToGmBinder,
  exportCharacterToHomebreweryV3,
  exportCharacterToImprovedInitiative,
  exportCharacterToVTTFoundry,
} from "monstershuffler-shared";
import type { Character } from "@/types";

const isStatBlockExportModalOpen = ref(false);
const exportedStatBlock = ref("");
const exportedStatBlockType = ref("");
const hasCopiedToClipboard = ref(false);

const character = inject("character") as ComputedRef<Character>;

function exportCharacterAs(type: string) {
  isStatBlockExportModalOpen.value = true;
  hasCopiedToClipboard.value = false;
  exportedStatBlockType.value = type;
  switch (type) {
    case "VTT Foundry":
      exportedStatBlock.value = exportCharacterToVTTFoundry(character.value);
      break;
    case "Improved Initiative":
      exportedStatBlock.value = exportCharacterToImprovedInitiative(
        character.value
      );
      break;
    case "GM Binder":
      exportedStatBlock.value = exportCharacterToGmBinder(character.value);
      break;
    case "Homebrewery V3":
      exportedStatBlock.value = exportCharacterToHomebreweryV3(character.value);
      break;
  }
}

function copyToClipboard() {
  navigator.clipboard.writeText(exportedStatBlock.value);
  hasCopiedToClipboard.value = true;
}
</script>

<style scoped>
.statblock-textarea {
  width: 100%;
  min-height: 300px;
  resize: none;
  font-family: "Courier New", Courier, monospace;
  white-space: nowrap;
  @apply h-full text-sm p-1 text-text bg-background-0 rounded;
}
.statblock-textarea:focus {
  outline: none;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.statblock-textarea::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.statblock-textarea {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
