<template>
  <MSMenu
    :hover="true"
    direction="bottomleft"
    class="navbar-link-container"
  >
    <div>
      <div class="navbar-link navbar-link-inactive">
        <font-awesome-icon
          icon="fas fa-solid fa-cog"
          fixed-width
          class="navbar-icon"
        />
        <span class="navbar-link-name">Settings</span>
      </div>
    </div>
    <template #dropdown>
      <a
        href="#something"
        class="dropdown-link"
      ><span>Span</span> Do something</a>
      <a
        href="#something"
        class="dropdown-link"
      >Something else</a>
      <a class="user-links-mobile dropdown-link">Login</a>
      <a class="user-links-mobile dropdown-link">Register</a>
      <span id="button-theme-mobile">
        Change theme: <span class="inline-block"><NavbarTheme /></span>
      </span>
      <NavbarSupport id="links-support-mobile" />
    </template>
  </MSMenu>
</template>

<style lang="scss">
.dropdown-link {
  @include themed {
    color: t($text);
  }
  text-decoration: none;
}
.dropdown-link:hover,
.dropdown-link:active {
  @include themed {
    background: t($text);
    color: t($background);
  }
}
.dropdown-link:visited {
  color: inherit;
}

#button-theme-mobile,
#links-support-mobile,
.user-links-mobile {
  display: none;
}
@media (max-width: 1100px) {
  #button-theme-mobile {
    display: inline-block;
  }
  #links-support-mobile {
    display: flex;
    margin: $s-1 auto 0 auto;
  }
}
.user-links-mobile {
  @include md {
    display: inline-block;
  }
}
</style>
