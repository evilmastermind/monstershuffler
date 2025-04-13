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
import { defaultDescription } from "@/utils";
const { locale } = useI18n();

useSeoMeta({
  description: defaultDescription,
});
</script>
<style scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("@/assets/images/backgrounds/login_20241203.webp") no-repeat
    66% center/cover;
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
