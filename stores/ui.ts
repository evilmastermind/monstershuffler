import { type Theme } from "./ui.d";

export const useUiStore = defineStore("ui", () => {
  const currentThemeName: Ref<string | null> = ref(null) || null;
  const themes: Theme[] = [
    {
      name: "light",
      icon: "fa-sun",
      type: "light",
    },
    {
      name: "dark",
      icon: "fa-moon",
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
    currentThemeName,
    currentThemeType,
  };
});
