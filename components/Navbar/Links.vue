<template>
  <NavbarLink
    :name="$t('navbar.menu.npcGenerator')"
    route="monsters-generator"
    @click="isMenuOpen = false"
  />
  <!-- <NavbarLink
    :name="$t('navbar.menu.editors')"
    route="editors"
    @click="isMenuOpen = false"
  /> -->
  <NavbarLink
    :name="$t('navbar.menu.dmScreen')"
    route="dm-screen"
    @click="isMenuOpen = false"
  />
  <!-- <NavbarLink
    :name="$t('navbar.menu.communityCreations')"
    route="community-creations"
    @click="isMenuOpen = false"
  /> -->
</template>

<script setup lang="ts">
const isMenuOpen = defineModel({ type: Boolean, default: false });
</script>

<style scoped></style>
