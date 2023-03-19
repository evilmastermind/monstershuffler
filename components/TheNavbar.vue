<template>
  <div id="nav-gradient" />
  <nav id="navbar">
    <div class="lg-max flex-row py-2 justify-space-between">
      <div
        id="navbar-menu"
        class="lg-max flex-row justify-center column-gap-s5"
      >
        <NavbarLogo
          name="Home"
          route="Home"
          icon="fa-user"
        />
        <NavbarLink
          name="Generator"
          route="monsters-generator"
          icon="fa-dice-d20"
        />
        <NavbarLink
          name="Editor"
          route="monsters-editor"
          icon="fa-user-edit"
        />
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
        <NavbarSettings />
      </div>
      <div
        id="navbar-other"
        class="flex-row justify-space-between column-gap-s6"
      >
        <NavbarTheme id="button-theme-desktop" />
        <NavbarSupport id="links-support-desktop" />
        <NavbarUser id="button-login-desktop" />
      </div>
    </div>
  </nav>
</template>


<style lang="scss" scoped>
#nav-gradient {
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
#navbar {
  position: absolute;
  width: 100%;
  height: $s-8;
  font-size: $s-4;
  padding: 0 $s-1;
  z-index: 1;
  //@include shadow-2;
}

#navbar-menu {
  @include md {
    justify-content: center;
  }
}

@media (max-width: 1170px) {
  #button-theme-desktop,
  #links-support-desktop {
    display: none;
  }
}
#button-login-desktop {
  @include md {
    display: none;
  }
}
</style>
