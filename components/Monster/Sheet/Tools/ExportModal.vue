<template>
  <MSModal
    v-if="statBlockExport.isModalOpen"
    @close="statBlockExport.isModalOpen = false"
  >
    <template #title>
      {{ $t(`monsterSheet.exportModalTitle`) }}
    </template>
    <template #default>
      <p class="content mt-1">
        {{ $t("monsterSheet.exportedAs") }} {{ statBlockExport.type }}.
      </p>
      <textarea
        v-model="statBlockExport.content"
        class="ms-input-style statblock-textarea mt-2"
      />
      <MSButton
        block
        class="mt-2"
        :color="hasCopiedToClipboard ? 'success' : 'dark'"
        icon="fa6-solid:clipboard"
        :text="hasCopiedToClipboard ? $t('copied') : $t('copyToClipboard')"
        @click="copy"
      />
      <MSButton
        block
        class="mt-2"
        :text="$t('close')"
        @click="statBlockExport.isModalOpen = false"
      />
    </template>
  </MSModal>
</template>

<script setup lang="ts">
import type { MonsterExport } from "@/types";
import { copyToClipboard } from "@/utils";

const statBlockExport = defineModel({
  type: Object as PropType<MonsterExport>,
  required: true,
});
const hasCopiedToClipboard = ref(false);

function copy() {
  copyToClipboard(statBlockExport.value.content);
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
  @apply h-full text-sm p-1 text-text bg-background-0 rounded shadow-sm;
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
