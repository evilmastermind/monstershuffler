<template>
  <button class="button-theme p-1 noselect" @click="setTheme()">
    <font-awesome-icon
      :icon="`fas fa-solid ${icon}`"
      class="button-theme-icon"
      size="1x"
      aria-hidden="true"
    />
    <span class="sr-only">{{ $t("navbar.changeTheme") }}</span>
  </button>
</template>

<script setup lang="ts">
import { useUiStore } from "@/stores/ui";

const ui = useUiStore();

const { themes } = ui;
const { currentThemeName } = storeToRefs(ui);

const icon: Ref<string> = ref("fa-sun");

// setting initial theme
const setInitialTheme = () => {
  if (currentThemeName.value) {
    setTheme(currentThemeName.value);
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    setTheme("dark");
  } else {
    setTheme("light");
  }
};
setInitialTheme();

function setTheme(themeName?: string) {
  if (themeName) {
    const index = themes.findIndex((theme) => theme.name === themeName) || 0;
    assignTheme(index);
  } else {
    let index =
      themes.findIndex(
        (theme) => theme.name === (currentThemeName.value || "light")
      ) || 0;
    if (index === themes.length - 1) index = -1;
    assignTheme(index + 1);
  }
  function assignTheme(index: number) {
    currentThemeName.value = themes[index]?.name || themes[0].name;
    document.body.classList.value = `${currentThemeName.value}-mode`;
    icon.value = themes[index]?.icon || themes[0].icon;
    localStorage.setItem("appTheme", currentThemeName.value);
  }
}

onMounted(() => {
  const appTheme = localStorage.getItem("appTheme");
  if (appTheme) {
    currentThemeName.value = appTheme;
    setTheme(appTheme);
  }
});
</script>
<style lang="scss" scoped>
.button-theme {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  min-height: theme("spacing.6");
  min-width: theme("spacing.6");
  cursor: pointer;
}
.button-theme:hover .button-theme-icon {
  color: theme("colors.primary.700");
}
.button-theme-icon {
  color: theme("colors.text-secondary");
  font-size: theme("spacing.4");
}
</style>
