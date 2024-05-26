import type { MonsterEditors } from "@/types";

export const useMonsterEditorStore = defineStore("monster-editor", () => {
  const currentEditorMode = ref<MonsterEditors>("");

  return {
    currentEditorMode,
  };
});
