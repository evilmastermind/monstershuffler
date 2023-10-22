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
import { ref } from "vue";
import type { Ref } from "vue";

interface Theme {
  name: string;
  icon: string;
}
const themes: Theme[] = [
  {
    name: "light",
    icon: "fa-sun",
  },
  {
    name: "dark",
    icon: "fa-moon",
  },
  // {
  //   name: "solarized",
  //   icon: "fa-cloud"
  // },
];

const icon: Ref<string> = ref("fa-sun");
const currentTheme: Ref<string | null> = ref(null) || null;

// setting initial theme
const setInitialTheme = () => {
  if (currentTheme.value) {
    setTheme(currentTheme.value);
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
        (theme) => theme.name === (currentTheme.value || "light")
      ) || 0;
    if (index === themes.length - 1) index = -1;
    assignTheme(index + 1);
  }
  function assignTheme(index: number) {
    currentTheme.value = themes[index]?.name || themes[0].name;
    document.body.classList.value = `${currentTheme.value}-mode`;
    icon.value = themes[index]?.icon || themes[0].icon;
    localStorage.setItem("appTheme", currentTheme.value);
  }
}

onMounted(() => {
  const appTheme = localStorage.getItem("appTheme");
  if (appTheme) {
    currentTheme.value = appTheme;
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
