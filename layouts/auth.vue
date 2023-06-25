<template>
  <div>
    <div class="background" />
    <div class="card-container">
      <MSCard class="auth-card">
        <slot />
      </MSCard>
    </div>
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      to bottom,
      theme("colors.background-inset.500") 0,
      rgba(var(--colors-background), 0.2) 100%
    ),
    url("@/assets/images/login-bg-1.jpg") no-repeat center center/cover;
  // background-color: t($background2);
  // background: rgba(t($background2), 0.7)
  //   url("@/assets/images/generator-bg-1.jpg") no-repeat center center/cover;
  // background-blend-mode: t($background-blend-mode);
  //  ;
  z-index: -2;
}
.card-container {
  width: 100vw;
  height: 100svh;
  display: grid;
  place-items: center;
}
.auth-card {
  width: 100vw;
  height: 100svh;
  @media (min-width: theme("screens.sm")) {
    width: 100%;
    max-width: 450px;
    height: auto;
  }
}
</style>
