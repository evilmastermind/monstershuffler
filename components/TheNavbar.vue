<template>
  <div class="nav-gradient" />
  <nav class="navbar">
    <div class="navbar-menu-container lg-max py-2">
      <div class="navbar-menu lg-max">
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
        <NavbarSettings class="settings" />
      </div>
      <div class="navbar-other">
        <NavbarTheme class="button-theme-desktop" />
        <NavbarSupport class="links-support-desktop" />
        <NavbarUser class="button-login-desktop" />
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav-gradient {
  position: absolute;
  //height: 100%;
  width: 100%;
  height: $s-8;
  z-index: 1;
  @include blurred();
  @include themed() {
    background: linear-gradient(
      180deg,
      t($background) 0,
      t($background-card) 100%
    );
    // background: rgb(t($background-light), 0.5);
  }
}
.navbar {
  position: absolute;
  width: 100%;
  height: $s-8;
  font-size: $s-4;
  padding: 0 $s-1;
  z-index: 1;
  //@include shadow-2;
}
.navbar-menu-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.settings {
  @include md {
    display: none;
  }
}
.navbar-menu {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $s-5;
  @include md {
    justify-content: flex-start;
  }
}

.navbar-other {
  display: none;

  @include md {
    display: flex;
    flex-direction: row;
    gap: $s-5;
  }
}
</style>
