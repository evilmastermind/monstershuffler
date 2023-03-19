<template>
  <div class="background" />
  <TheNavbar />
  <slot />
</template>
<style lang="scss" scoped>
.background {
  position: absolute;
  z-index:-3;
  min-width: 100%;
  min-height: 100%;
  @include themed {
    background-color: t($background);
  }
}
</style>
