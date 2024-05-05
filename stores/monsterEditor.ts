export const useMonsterEditorStore = defineStore("monster-editor", () => {
  const isEditorModeEnabled = ref(false);

  return {
    isEditorModeEnabled,
  };
});
