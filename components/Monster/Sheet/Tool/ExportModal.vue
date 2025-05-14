<template>
  <UModal
    v-model:open="open"
    :title="$t(`monsterSheet.exportModalTitle`)"
    :description="
      $t('monsterSheet.exportedAs', { format: statBlockExport.type })
    "
    close
  >
    <template #body>
      <UTextarea
        v-model="statBlockExport.content"
        class="w-full font-mono text-sm"
        :autoresize="true"
        :maxrows="6"
        color="neutral"
        :highlight="false"
      />
    </template>
    <template #footer>
      <UButton
        :label="$t('close')"
        color="neutral"
        variant="outline"
        @click="open = false"
      />
      <UButton
        :label="hasCopiedToClipboard ? $t('copied') : $t('copyToClipboard')"
        icon="i-xxx-clipboard"
        :color="hasCopiedToClipboard ? 'success' : 'neutral'"
        @click="copy"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { MonsterExport } from "@/types";
import { copyToClipboard } from "@/utils";

const open = defineModel<boolean>({
  default: false,
});

const p = defineProps({
  statBlockExport: {
    type: Object as PropType<MonsterExport>,
    required: true,
  },
});

const hasCopiedToClipboard = ref(false);

function copy() {
  copyToClipboard(p.statBlockExport.content);
  hasCopiedToClipboard.value = true;
}
</script>

<style scoped></style>
