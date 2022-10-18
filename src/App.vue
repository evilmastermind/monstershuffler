<template>
  <navbar />
  <router-view />
</template>

<script setup lang="ts">
import Navbar from "@/components/navbar/TheNavbar.vue";

const setTheme = () => {
  document.body.classList.value = "theme--light";
};
setTheme();

</script>