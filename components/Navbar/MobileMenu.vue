<template>
  <div>
    <button
      id="navbar-menu-toggle"
      class="menu-toggle"
      :class="[isMenuOpen ? 'active' : '']"
      @click="isMenuOpen = !isMenuOpen"
    >
      <span class="sr-only">Toggle menu</span>
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
    </button>
    <div v-if="isMenuOpen" class="menu mt-[4rem]">
      <div class="menu-list p-6">
        <NavbarLinks v-model="isMenuOpen" />
        <span class="mt-4 mr-4"
          >Change theme: <NavbarTheme class="ml-2 theme"
        /></span>
        <span>Other resources:<NavbarSupport class="ml-2 support" /></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false);

onMounted(() => {
  //   const menuToggle = document.querySelector("#navbar-menu-toggle");
  //   if (menuToggle) {
  //     menuToggle.addEventListener("click", () => {
  //       menuToggle.classList.toggle("active");
  //     });
  //   }
});
</script>

<style scoped>
.menu-toggle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 6px;
  @apply mr-4;
}
.menu-toggle div {
  width: 28px;
  height: 3px;
  transition: 0.2s;
  @apply bg-text-2 rounded-sm;
}
.menu-toggle.active .bar1 {
  transform: rotate(-45deg) translate(-6px, 6px);
}
.menu-toggle.active .bar2 {
  opacity: 0;
}
.menu-toggle.active .bar3 {
  transform: rotate(45deg) translate(-6px, -6px);
}
.menu {
  position: fixed;
  inset: 0;
  @apply bg-background-50;
}
.menu-list {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  @apply gap-4;
}
.theme {
  display: inline;
}
.support {
  display: inline-flex;
}
</style>
