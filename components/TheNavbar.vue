<template>
  <div class="nav-gradient h-8" />
  <nav class="navbar centered h-8">
    <div class="navbar-menu-container lg-max">
      <div class="navbar-menu">
        <NavbarLogo name="Home" route="Home" />
        <NavbarLink
          :name="$t('navbar.menu.npcGenerator')"
          route="monsters-generator"
          icon="fa6-solid:dice-d20"
        />
        <NavbarLink
          :name="$t('navbar.menu.editor')"
          route="monsters-editor"
          icon="fa-solid:user-edit"
        />
        <NavbarLink
          :name="$t('navbar.menu.dmScreen')"
          route="monsters-your-creations"
          icon="fa6-solid:book-open"
        />
        <NavbarLink
          :name="$t('navbar.menu.monsters')"
          route="monsters-community-creations"
          icon="fa6-solid:dragon"
        />
        <NavbarSettings class="md:hidden" />
      </div>
      <div class="navbar-other hidden md:flex gap-5">
        <NavbarTheme />
        <NavbarSupport />
        <NavbarUser />
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav-gradient {
  position: absolute;
  width: 100vw;
  z-index: 1;
  backdrop-filter: blur(5px);
  opacity: 0.95;
  background: linear-gradient(
    180deg,
    theme("colors.background.100") 0,
    theme("colors.background-card") 100%
  );
}
.navbar {
  position: absolute;
  width: 100vw;
  z-index: 1;
}
.navbar-menu-container {
  display: block;
  @apply px-4;
}
.navbar-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  @apply gap-5;
}
@media (min-width: theme("screens.sm")) {
  .navbar-menu-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .navbar-menu {
    display: flex;
    justify-items: start;
    align-items: center;
    @apply gap-5;
  }
}
@media (min-width: theme("screens.md")) {
  .navbar-menu-container {
    display: flex;
    justify-content: space-between;
  }
  .navbar-menu {
    display: flex;
    align-items: center;
    @apply gap-5;
  }
}

/* .navbar-menu {
  display: flex;
  align-items: center;
  @apply max-w-lg gap-5 justify-evenly md:justify-start sm:justify-center;
}
*/

.navbar-other {
  flex-direction: row;
}
</style>
