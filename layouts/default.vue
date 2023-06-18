<template>
  <div>
    <div class="background" />
    <TheNavbar />
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.background {
  position: absolute;
  z-index: -3;
  min-width: 100%;
  min-height: 100%;
  background-color: theme("colors.background");
}
</style>
