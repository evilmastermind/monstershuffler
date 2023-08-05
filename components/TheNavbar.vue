<template>
  <div class="nav-gradient h-8" />
  <nav class="navbar centered h-8">
    <div class="navbar-menu-container lg-max">
      <div class="navbar-menu">
        <NavbarLogo name="Home" route="Home" icon="fa-user" />
        <NavbarLink
          name="Generator"
          route="monsters-generator"
          icon="fa-dice-d20"
        />
        <NavbarLink name="Editor" route="monsters-editor" icon="fa-user-edit" />
        <NavbarLink
          name="DM Screen"
          route="monsters-your-creations"
          icon="fa-book-open"
        />
        <NavbarLink
          name="Monsters"
          route="monsters-community-creations"
          icon="fa-dragon"
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
  width: 100%;
  z-index: 1;
  backdrop-filter: blur(5px);
  opacity: 0.95;
  background: linear-gradient(
    180deg,
    theme("colors.background") 0,
    theme("colors.background-card") 100%
  );
}
.navbar {
  position: absolute;
  width: 100%;
  z-index: 1;
}
.navbar-menu-container {
  display: flex;
  align-items: center;
  @apply justify-center md:justify-between;
}
.navbar-menu {
  display: flex;
  align-items: center;
  @apply max-w-lg gap-5 justify-center md:justify-start;
}

.navbar-other {
  flex-direction: row;
}
</style>
