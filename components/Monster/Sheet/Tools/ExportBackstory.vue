<template>
  <MSMenuList>
    <MSMenuItem :label="$t('HTML')" @click="exportAdventureAs('HTML')" />
    <MSMenuItem
      :label="$t('markdown')"
      @click="exportAdventureAs('markdown')"
    />
  </MSMenuList>
</template>

<script setup lang="ts">
import type { MonsterExport } from "@/types";

const p = defineProps({
  hide: {
    type: Function,
    required: true,
  },
});

const lexical = useLexicalStore();
const backstoryExport = defineModel({
  type: Object as PropType<MonsterExport>,
  required: true,
});
const hasCopiedToClipboard = ref(false);

async function exportAdventureAs(type: "HTML" | "markdown") {
  p.hide();
  backstoryExport.value.isModalOpen = true;
  hasCopiedToClipboard.value = false;
  backstoryExport.value.type = type;
  switch (type) {
    case "HTML":
      backstoryExport.value.content = lexical.toHTML();
      break;
    case "markdown":
      backstoryExport.value.content = await lexical.toMarkdown();
      break;
  }
  // create a file and download it
  // const blob = new Blob([output], { type: "text/plain" });
  // const url = URL.createObjectURL(blob);
  // const a = document.createElement("a");
  // a.href = url;
  // a.download = "adventure." + type;
  // a.click();
  // URL.revokeObjectURL(url);
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
