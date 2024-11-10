<template>
  <div class="background-container bg-black mask">
    <NavbarPadding />
    <div class="background">
      <div class="background-image" />
      <div class="bg-max">
        <div class="lg-max">
          <div class="text mx-4">
            <p class="custom-title-small">v2 preview:</p>
            <h1 class="custom-title mt-2">The NPC Improvisator</h1>
            <div>
              <MSButton
                to="monsters-generator"
                color="monstershuffler"
                class="mt-4"
                text="Try it now"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
</script>

<style scoped>
.background {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 500px;
  overflow: hidden;
  z-index: -2;
  width: 100%;
  background-color: transparent;
}
.background-image {
  position: absolute;
  width: 100%;
  height: 500px;
  background-image: url("@/assets/images/background-paint.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 0;
}
.text {
  position: relative;
  z-index: 1;
}
.mask {
  mask-image: url("/images/masks/bottom-2.webp");
  mask-repeat: repeat-x;
  mask-position: bottom center;
}
.custom-title {
  font-family: "OpenSans", sans-serif;
  font-weight: 800;
  font-size: 3.5rem;
  letter-spacing: -0.09em;
  line-height: 0.7em;
  color: white;
  text-shadow: 0 0 10px black;
}
.custom-title-small {
  font-family: "OpenSans", sans-serif;
  font-weight: 600;
  font-size: 1rem;
  color: white;
  text-shadow: 0 0 10px black;
}
</style>
