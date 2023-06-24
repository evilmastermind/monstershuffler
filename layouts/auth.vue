<template>
  <div>
    <div class="background" />
    <slot />
  </div>
</template>
<script setup lang="ts">
import { defaultHead, defaultDescription } from "@/utils/seo";
useHead({
  meta: [...defaultHead, ...defaultDescription],
});
</script>
<style scoped lang="scss">
.background {
  position: absolute;
  z-index: -3;
  min-width: 100%;
  min-height: 100%;
  background-color: theme("colors.background");
}
</style>
