<template>
  <div class="nav-gradient h-8" />
  <nav class="navbar h-8 py-1">
    <div class="navbar-menu-container lg-max py-2">
      <div class="navbar-menu gap-5 lg-max md:justify-start">
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
      <div class="navbar-other md:flex gap-5">
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
  justify-content: space-between;
  align-items: center;
}
.navbar-menu {
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar-other {
  display: none;
  flex-direction: row;
}
</style>
