<template>
  <div class="nav-gradient h-8" />
  <nav class="navbar centered h-8">
    <div class="navbar-menu-container lg-max">
      <div class="navbar-menu">
        <NavbarLogo name="Home" route="Home" />
        <span class="navbar-menu desktop-only">
          <NavbarLinks />
        </span>
      </div>
      <div class="navbar-other">
        <NavbarTheme class="desktop-only" />
        <NavbarSupport class="desktop-only" />
        <NavbarUser />
        <NavbarMobileMenu class="mobile-only" />
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-gradient {
  position: fixed;
  width: 100vw;
  z-index: 100;
  backdrop-filter: blur(5px);
  @apply border-b border-b-background-300 bg-gradient-to-b from-background-100/100 to-background-200/80;
}
.navbar {
  position: fixed;
  width: 100vw;
  z-index: 100;
}
.navbar-menu-container {
  display: flex;
  justify-content: space-between;
  @apply px-4;
}
.navbar-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  letter-spacing: 0.05em;
  @apply text-sm;
  @apply gap-6;
}
.desktop-only {
  display: none;
}
.mobile-only {
  display: flex;
}
@media (min-width: theme("screens.md")) {
  .desktop-only {
    display: flex;
  }
  .navbar-menu-container {
    display: flex;
    justify-content: space-between;
  }
  .navbar-menu {
    display: flex;
    align-items: center;
    @apply gap-6;
  }
  .navbar-menu-links {
    display: flex;
  }
  .mobile-only {
    display: none;
  }
}

/* .navbar-menu {
  display: flex;
  align-items: center;
  @apply max-w-lg gap-5 justify-evenly md:justify-start sm:justify-center;
}
*/

.navbar-other {
  display: flex;
  flex-direction: row;
  @apply gap-5;
}
</style>
