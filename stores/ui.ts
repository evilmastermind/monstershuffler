import type { Theme } from "@/types";

export const useUiStore = defineStore("ui", () => {
  const currentThemeName: Ref<string | null> = ref(null) || null;
  const alertClicked = ref<Record<string, boolean>>({});
  const themes: Theme[] = [
    {
      name: "light",
      icon: "sun",
      type: "light",
    },
    {
      name: "dark",
      icon: "moon",
      type: "dark",
    },
    // {
    //   name: "solarized",
    //   icon: "fa-cloud"
    // },
  ];

  const currentThemeType = computed(() => {
    return (
      themes.find((theme) => theme.name === currentThemeName.value)?.type ||
      "light"
    );
  });

  return {
    themes,
    alertClicked,
    currentThemeName,
    currentThemeType,
  };
});
