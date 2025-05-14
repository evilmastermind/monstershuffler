import type { MonsterEditors } from "@/types";

export const useMonsterEditorStore = defineStore("monster-editor", () => {
  const isLayoutEditorOpen = ref(false);
  const isImageEditorOpen = ref(false);

  function closeEditors() {
    isLayoutEditorOpen.value = false;
    isImageEditorOpen.value = false;
  }

  return {
    isLayoutEditorOpen,
    isImageEditorOpen,
    closeEditors,
  };
});
