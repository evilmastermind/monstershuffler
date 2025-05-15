<template>
  <nav
    class="w-full h-[60px] flex items-center border-b border-muted bg-linear-to-b from-(--ui-bg) to-(--ui-bg-muted) backdrop-blur-xs z-20"
  >
    <UContainer>
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-8">
          <NavBarLogo />
          <NavBarLink
            class="hidden md:block"
            :name="$t('navbar.menu.home')"
            route="index"
          />
          <NavBarLink
            class="hidden md:block"
            :name="$t('navbar.menu.npcGenerator')"
            route="monsters-generator"
          />
          <!-- <NavBarLink
            class="hidden md:block"
            :name="$t('navbar.menu.editors')"
            route="monsters-editors"
          />
          <NavBarLink
            class="hidden md:block"
            :name="$t('navbar.menu.communityCreations')"
            route="monsters-community-creations"
          /> -->
        </div>
        <div class="flex items-center gap-4">
          <NavBarSocialLinks class="hidden md:inline-flex" />

          <NavBarSettings />
          <NavBarUser />
          <NavBarBurger class="inline-flex md:hidden" />
        </div>
      </div>
    </UContainer>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped></style>
