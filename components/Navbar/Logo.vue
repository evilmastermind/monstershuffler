<template>
  <div class="navbar-link">
    <NuxtLink
      class="content ms-logo basis-9 max-[700px]:basis-7 max-[575px]:mr-0"
      :to="localePath('/')"
    >
      <div class="ms-logo-gradient" />
      <MSLogo
        class="logo"
        :class="[ui.currentThemeType === 'dark' ? 'logo-shadow' : '']"
      />
      <span class="sr-only">{{ $t("navbar.menu.home") }}</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const ui = useUiStore();
</script>
<style scoped>
.ms-logo {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
}
.logo {
  position: relative;
  z-index: 1;
}
.logo-shadow {
  filter: drop-shadow(0 0 0.3rem theme("colors.text-evil/10%"));
}
</style>
