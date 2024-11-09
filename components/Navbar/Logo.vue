<template>
  <div class="navbar-link">
    <NuxtLink
      class="content ms-logo basis-9 max-[700px]:basis-7 max-[575px]:mr-0"
      :to="localePath('/')"
    >
      <MSLogo />
      <span class="sr-only">{{ $t("navbar.menu.home") }}</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
</script>
<style scoped>
.ms-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
}
</style>
