<template>
  <div id="nav-gradient" />
  <nav id="navbar">
    <div
      class="lg-max flex-row py-2 justify-space-between"
    >
      <div
        id="navbar-menu"
        class="lg-max flex-row justify-center   column-gap-s5"
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
        class="flex-row justify-space-between column-gap-s12"
      >
        <ButtonTheme id="button-theme&quot;" />
        <div class="flex-row justify-space-between column-gap-s1">
          <LinkSupport
            name="Patreon"
            link="https://www.patreon.com/monstershuffler"
            icon="fa-patreon"
          />
          <LinkSupport
            name="Github"
            link="https://github.com/evilmastermind/monstershuffler"
            icon="fa-github"
          />
          <LinkSupport
            name="Reddit"
            link="https://www.reddit.com/r/monstershuffler/"
            icon="fa-reddit-alien"
          />
        </div>
        <ButtonLogin />
      </div>
    </div>
  </nav>
</template>

<script setup>
import MSLogo from "@/components/navbar/MSLogo.vue";
import LinkNavbar from "@/components/navbar/LinkNavbar.vue";
import LinkSupport from "@/components/navbar/LinkSupport.vue";
import ButtonSettings from "@/components/navbar/ButtonSettings.vue";
import ButtonTheme from "@/components/navbar/ButtonTheme.vue";
import ButtonLogin from "@/components/navbar/ButtonLogin.vue";

</script>

<style lang="scss" scoped>
#nav-gradient {
  position: absolute;
  height: 100%;
  width: 100%;
  height: 6rem;
  @include themed() {
    background: linear-gradient(180deg,t($background) 0,transparent 100%);
  }
}
#navbar {
  position: absolute;
  width: 100%;
  height: 3rem;
  font-size: $s-4;
  padding: 0 $s-1;
  @include themed() {
    //border-bottom: 3px solid #000;
    //border-top: 1px solid #000;
    //box-shadow: inset 0 0 5px darken(t($text-accent),50);
    //box-shadow: 0 1px 3px 0 rgba(t($text), 0.15), 0 1px 2px -1px rgba(t($text), 0.15);
    //background-color: t($text-accent);
    //background: linear-gradient(180deg,t($primary-100) 0,transparent 100%);
  }
}
.flex-row {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.justify-center {
  justify-content: left;
}
.justify-space-between {
  justify-content: space-between;
}
.column-gap-s1 {
  column-gap: $s-1;
}
.column-gap-s3 {
  column-gap: $s-3;
}
.column-gap-s4 {
  column-gap: $s-4;
}

.column-gap-s5 {
  column-gap: $s-5;
}
.column-gap-s8 {
  column-gap: $s-8;
}
.column-gap-s12 {
  column-gap: $s-12;
}
.py-2 {
  padding: $s-2 0;
}
#navbar-menu {
  @include md {
    justify-content: center;
  }
}
</style>