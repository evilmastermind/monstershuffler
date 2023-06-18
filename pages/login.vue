<template>
  <div>
    <div class="background" />
    <AuthLoginCard class="login-card" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
</script>

<style scoped lang="scss">
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("@/assets/images/generator-bg-1.jpg") no-repeat center
    center/cover;
  // background-color: t($background2);
  // background: rgba(t($background2), 0.7)
  //   url("@/assets/images/generator-bg-1.jpg") no-repeat center center/cover;
  // background-blend-mode: t($background-blend-mode);
  //  ;
  z-index: -2;
}
.login-card {
  width: 100vw;
  height: 100svh;
  @media (min-width: theme("screens.sm")) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 400px;
    height: fit-content;
  }
}
</style>
