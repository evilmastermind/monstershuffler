<template>
  <VMenu
    :triggers="['hover', 'click', 'focus', 'touch']"
    class="z-index"
    placement="bottom"
  >
    <button class="navbar-link navbar-link-inactive cursor-pointer">
      <span class="navbar-icon">
        <Icon name="fa-solid:cog" aria-hidden />
      </span>
      <span class="navbar-link-name">{{ $t("navbar.menu.settings") }}</span>
    </button>
    <template #popper>
      <MSMenuList>
        <NuxtLink
          v-if="!user.token"
          :to="localePath({ name: 'login' })"
          class="menu-item"
          >{{ $t("navbar.login") }}</NuxtLink
        >
        <NuxtLink
          v-if="!user.token"
          :to="localePath({ name: 'registration' })"
          class="menu-item"
          >{{ $t("navbar.register") }}</NuxtLink
        >
        <button
          v-if="user.token"
          class="menu-item text-left bold"
          @click="user.logout()"
        >
          {{ $t("navbar.logout") }}
        </button>
        <p id="button-theme-mobile" class="px-2 mt-2">
          Change theme: <span class="inline-block ml-2"><NavbarTheme /></span>
        </p>
        <div class="my-4">
          <NavbarSupport id="links-support-mobile" />
        </div>
      </MSMenuList>
    </template>
  </VMenu>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const user = useUserStore();
</script>
<style scoped>
#button-theme-mobile,
#links-support-mobile,
.user-links-mobile {
  display: inline-block;
}
@media (max-width: 1100px) {
  #button-theme-mobile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  #links-support-mobile {
    display: flex;
    margin: theme("spacing.1") auto 0 auto;
  }
}

.z-index {
  z-index: 10000;
}
</style>
