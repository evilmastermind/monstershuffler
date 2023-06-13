<template>
  <div>
    <div class="background" />
    <slot />
  </div>
</template>
<style scoped lang="scss">
.background {
  position: absolute;
  z-index: -3;
  min-width: 100%;
  min-height: 100%;
  @include themed {
    background-color: t($background);
  }
}
</style>
