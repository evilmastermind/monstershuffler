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
const user = useUserStore();
user.getGeneralSettings();
</script>

<style scoped>
.background {
  position: absolute;
  z-index: -3;
  min-width: 100%;
  min-height: 100%;
}
</style>
