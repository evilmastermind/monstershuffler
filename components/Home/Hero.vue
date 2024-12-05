<template>
  <div class="background-container bg-black mask">
    <NavbarPadding />
    <div class="background">
      <div class="background-image" />
      <div class="bg-max">
        <div class="lg-max">
          <div class="text mx-4">
            <p class="custom-title-small">v2 preview:</p>
            <h1 class="custom-title mt-2">The NPC Generator</h1>
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
  --bg-height: 350px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: var(--bg-height);
  overflow: hidden;
  z-index: -2;
  width: 100%;
  background-color: transparent;
}
.background-image {
  position: absolute;
  width: 100%;
  height: var(--bg-height);
  background-image: url("/assets/images/hero/generator_20241213.webp");
  background-position: 85%;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 0;
}
.text {
  position: relative;
  margin-top: 5rem;
  z-index: 1;
}
.mask {
  mask-image: url("/images/masks/bottom-2.webp");
  mask-repeat: repeat-x;
  mask-position: bottom center;
}
.custom-title {
  font-family: "LibreBaskerville", sans-serif;
  font-weight: 800;
  font-size: 2.2rem;
  letter-spacing: -0.06em;
  line-height: 0.9em;
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

@media (min-width: theme("screens.md")) {
  .background {
    --bg-height: 500px;
  }
  .custom-title {
    font-size: 3.5rem;
  }
}
@media (min-width: 1500px) {
  .background {
    --bg-height: 600px;
  }
}
@media (min-width: theme("screens.xl")) {
  .background {
    --bg-height: 700px;
  }
}
</style>
