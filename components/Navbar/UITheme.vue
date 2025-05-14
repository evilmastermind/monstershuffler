<template>
  <ClientOnly>
    <div class="grid grid-cols-3 gap-1">
      <UButton
        icon="i-xxx-sun"
        color="neutral"
        size="sm"
        :variant="colorMode.value === 'light' ? 'soft' : 'outline'"
        @click="colorMode.preference = 'light'"
      >
        {{ $t("navbar.settings.theme.light") }}
      </UButton>
      <UButton
        icon="i-xxx-moon"
        color="neutral"
        :variant="colorMode.value === 'dark' ? 'soft' : 'outline'"
        size="sm"
        @click="colorMode.preference = 'dark'"
      >
        {{ $t("navbar.settings.theme.dark") }}
      </UButton>
      <UButton
        icon="i-xxx-pc"
        color="neutral"
        size="sm"
        :variant="colorMode.value === 'system' ? 'soft' : 'outline'"
        @click="colorMode.preference = 'system'"
      >
        {{ $t("navbar.settings.theme.system") }}
      </UButton>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
// const { preferences, info } = storeToRefs(user);

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    // user.toggleTheme();
  },
});
</script>

<style scoped></style>
