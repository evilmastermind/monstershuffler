<template>
  <MSMenu :hover="true" direction="bottomleft" class="navbar-link-container">
    <div>
      <div class="navbar-link navbar-link-inactive">
        <font-awesome-icon
          icon="fas fa-solid fa-cog"
          fixed-width
          class="navbar-icon"
        />
        <span class="navbar-link-name">{{ $t("navbar.menu.settings") }}</span>
      </div>
    </div>
    <template #dropdown>
      <NuxtLink
        v-if="!user.token"
        :to="localePath({ name: 'login' })"
        class="content md:hidden dropdown-link"
        >{{ $t("navbar.login") }}</NuxtLink
      >
      <NuxtLink
        v-if="!user.token"
        :to="localePath({ name: 'registration' })"
        class="content md:hidden dropdown-link"
        >{{ $t("navbar.register") }}</NuxtLink
      >
      <button
        v-if="user.token"
        class="md:hidden dropdown-link text-left bold"
        @click="user.logout()"
      >
        {{ $t("navbar.logout") }}
      </button>
      <p id="button-theme-mobile" class="content">
        Change theme: <span class="inline-block"><NavbarTheme /></span>
      </p>
      <div class="mt-4">
        <NavbarSupport id="links-support-mobile" />
      </div>
    </template>
  </MSMenu>
</template>
<script setup lang="ts">
const localePath = useLocalePath();
const user = useUserStore();
</script>
<style lang="scss" scoped>
.dropdown-link {
  color: theme("colors.text");
  text-decoration: none;
  @apply px-2;
}
.dropdown-link:hover,
.dropdown-link:active {
  background: theme("colors.text");
  color: theme("colors.background") !important;
}
.dropdown-link:visited {
  color: inherit;
}
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
</style>
