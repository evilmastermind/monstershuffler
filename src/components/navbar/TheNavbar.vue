<template>
  <nav id="navbar">
    <div class="lg-max flex-row">
      <NavbarLink
        name="Home"
        route="Home"
        icon="fa-user"
      />
      <NavbarLink
        name="Generator"
        route="NPC Generator"
        icon="fa-dice-d20"
      />
      <NavbarLink
        name="Editor"
        route="Monster Editor"
        icon="fa-user-edit"
      />
      <NavbarLink
        name="You"
        route="Your Creations"
        icon="fa-user"
      />
      <NavbarLink
        name="Community"
        route="Community Creations"
        icon="fa-users"
      />
      <NavbarLink
        name="Settings"
        route="Community Creations"
        icon="fa-cog"
      />
    </div>
  </nav>
</template>

<script setup>
import NavbarLink from "@/components/navbar/NavbarLink.vue";
</script>

<style lang="scss" scoped>
#navbar {
  @include themed() {
    background: linear-gradient(180deg,desaturate(t($primary-100),50) 0, t($background) 10em);
    box-shadow: 0 1px 3px 0 rgba(t($text), 0.15), 0 1px 2px -1px rgba(t($text), 0.15);
  }
}
.flex-row {
  padding: $s-2 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: left;
  align-items: center;
  //column-gap: 2rem;

  @include md {
    justify-content: center;
  }
}
.compl {
  @include themed() {
    color: t($complementary-500);
  }
}
</style>