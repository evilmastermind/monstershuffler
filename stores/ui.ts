import type { Theme } from "@/types";

export const useUiStore = defineStore("ui", () => {
  const alertClicked = ref<Record<string, boolean>>({});
  const colorMode = useColorMode();

  const isDark = computed({
    get() {
      return colorMode.value === "dark";
    },
    set(_isDark) {
      colorMode.preference = _isDark ? "dark" : "light";
    },
  });

  return {
    isDark,
    alertClicked,
  };
});
