<template>
  <div class="layout">
    <div class="background" />
    <TheNavbar />
    <slot />
  </div>
</template>
<script setupl lang="ts">
import { defaultHead } from "@/utils/seo";
useHead({
  meta: [...defaultHead],
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
