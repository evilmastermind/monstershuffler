<template>
  <div id="nav-gradient" />
  <nav id="navbar">
    <div class="lg-max flex-row py-2 justify-space-between">
      <div
        id="navbar-menu"
        class="lg-max flex-row justify-center column-gap-s5"
      >
        <MSLogo
          name="Home"
          route="Home"
          icon="fa-user"
        />
        <LinkNavbar
          name="Generator"
          route="NPC Generator"
          icon="fa-dice-d20"
        />
        <LinkNavbar
          name="Editor"
          route="Monster Editor"
          icon="fa-user-edit"
        />
        <LinkNavbar
          name="DM Screen"
          route="Your Creations"
          icon="fa-book-open"
        />
        <LinkNavbar
          name="Monsters"
          route="Community Creations"
          icon="fa-dragon"
        />
        <ButtonSettings />
      </div>
      <div
        id="navbar-other"
        class="flex-row justify-space-between column-gap-s6"
      >
        <ButtonTheme id="button-theme-desktop" />
        <LinksSupport id="links-support-desktop" />
        <ButtonLogin id="button-login-desktop" />
      </div>
    </div>
  </nav>
</template>

<script setup>
import MSLogo from "@/components/navbar/MSLogo.vue";
import LinkNavbar from "@/components/navbar/LinkNavbar.vue";
import LinksSupport from "@/components/navbar/LinksSupport.vue";
import ButtonSettings from "@/components/navbar/ButtonSettings.vue";
import ButtonTheme from "@/components/navbar/ButtonTheme.vue";
import ButtonLogin from "@/components/navbar/ButtonsUser.vue";
</script>

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
      rgb(t($background), 0.3) 100%
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
