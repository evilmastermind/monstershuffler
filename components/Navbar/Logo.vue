<template>
  <div class="navbar-link">
    <NuxtLink :to="localePath('/')">
      <MSLogo
        class="w-[40px]"
        :class="[colorMode.value === 'dark' ? 'logo-shadow' : '']"
      />
      <span class="sr-only">{{ $t("navbar.menu.home") }}</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const colorMode = useColorMode();
</script>
<style scoped>
.logo-shadow {
  filter: drop-shadow(0 0 2px #ffffff22);
}
</style>
