<template>
  <div class="background" />
  <navbar />
  <router-view />
</template>

<script setup lang="ts">
import Navbar from "@/components/navbar/TheNavbar.vue";
</script>
<style lang="scss">
.background {
  position: absolute;
  z-index:-3;
  min-width: 100%;
  min-height: 100%;
  @include themed {
    background-color: t($background);
  }
}
</style>