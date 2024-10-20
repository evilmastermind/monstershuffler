<template>
  <NavbarLink
    :name="$t('navbar.menu.npcGenerator')"
    route="monsters-generator"
    @click="isMenuOpen = false"
  />
  <NavbarLink
    :name="$t('navbar.menu.editor')"
    route="monsters-editor"
    @click="isMenuOpen = false"
  />
  <NavbarLink
    :name="$t('navbar.menu.dmScreen')"
    route="monsters-your-creations"
    @click="isMenuOpen = false"
  />
  <NavbarLink
    :name="$t('navbar.menu.monsters')"
    route="monsters-community-creations"
    @click="isMenuOpen = false"
  />
</template>

<script setup lang="ts">
const isMenuOpen = defineModel({ type: Boolean, default: false });
</script>

<style scoped></style>
