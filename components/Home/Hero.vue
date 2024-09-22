<template>
  <div class="bg-black mask">
    <NavbarPadding />
    <div class="background-color background-color-dark">
      <div class="bg-max">
        <div class="background-image" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.background-color {
  z-index: -2;
  width: 100%;
}
.background-color-dark {
  background-color: transparent;
}
.background-image {
  position: relative;
  width: 100%;
  height: 500px;
  background-image: url("@/assets/images/background-test-1.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.mask {
  mask-image: url("/images/masks/bottom-2.webp");
  mask-repeat: repeat-x;
  mask-position: bottom center;
}
</style>
