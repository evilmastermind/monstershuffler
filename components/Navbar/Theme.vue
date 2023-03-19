<template>
  <div
    class="button-theme noselect"
    @click="setTheme()"
  >
    <font-awesome-icon
      :icon="`fas fa-solid ${icon}`"
      class="button-theme-icon"
      size="1x"
    />
  </div>
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
    icon: "fa-sun"
  },
  {
    name: "dark",
    icon: "fa-moon"
  },
  // {
  //   name: "solarized",
  //   icon: "fa-cloud"
  // },
];

let icon: Ref<string> = ref("fa-sun");
let currentTheme: Ref<string | null>  = ref(localStorage.getItem("appTheme")) || null;

// setting initial theme
const setInitialTheme = () => {
  if(currentTheme.value) {
    setTheme(currentTheme.value);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    setTheme("dark");
  } else {
    setTheme("light");
  }
};
setInitialTheme();

function setTheme(themeName?: string) {
  if(themeName) {
    const index = themes.findIndex(theme => theme.name === themeName) || 0;
    assignTheme(index);
  } else {
    let index = themes.findIndex(theme => theme.name === (currentTheme.value || "light")) || 0;
    if (index === themes.length-1) index = -1;
    assignTheme(index + 1);
  }
  function assignTheme(index: number) {
    currentTheme.value =  themes[index]?.name || themes[0].name;
    document.body.classList.value = `theme--${currentTheme.value}`;
    icon.value = themes[index]?.icon || themes[0].icon;
    localStorage.setItem("appTheme",currentTheme.value);
  }
}
</script>

<style lang="scss" scoped>
.button-theme {
  display:flex;
  justify-content: center;
  align-items:center;
  padding: $s-1;
  border-radius:50%;
  min-height:$s-6;
  min-width:$s-6;
  cursor: pointer;
}
.button-theme:hover .button-theme-icon {
  @include themed() {
    color: t($primary-700);
  }
}
.button-theme-icon {
  @include themed() {
    color: t($text-secondary);
    font-size: $f-3;
  }
}
</style>
