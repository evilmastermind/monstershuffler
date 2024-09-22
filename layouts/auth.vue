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
import { defaultHead, defaultDescription } from "@/utils";
const { locale } = useI18n();
useHead({
  meta: [...defaultHead, ...defaultDescription],
  htmlAttrs: {
    lang: locale.value,
  },
});
</script>
<style scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      to bottom,
      theme("colors.background-inset.500") 0,
      rgba(var(--colors-background-100), 0.2) 100%
    ),
    url("@/assets/images/login-bg-1.jpg") no-repeat center center/cover;
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
