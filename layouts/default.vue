<template>
  <div class="layout">
    <div class="background" />
    <TheNavbar />
    <main>
      <slot />
    </main>
  </div>
</template>
<script setup lang="ts">
import { defaultHead } from "@/utils";
const { locale } = useI18n();
useHead({
  meta: [...defaultHead],
  htmlAttrs: {
    lang: locale.value,
  },
});
</script>
<style lang="scss" scoped>
.background {
  position: absolute;
  z-index: -3;
  min-width: 100%;
  min-height: 100%;
  background-color: theme("colors.background");
}
</style>
