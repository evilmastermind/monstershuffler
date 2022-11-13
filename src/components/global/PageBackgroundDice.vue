<template>
  <div class="background-dice-container">
    <font-awesome-icon
      v-for="(die, key) in bgDiceArray"
      :key="key"
      class="d20-bg"
      :style="die"
      icon="fas fa-solid fa-dice-d20"
    />
    <font-awesome-icon
      v-for="(die, key) in bgD6Array"
      :key="key"
      class="d6-bg"
      :style="die"
      icon="fas fa-solid fa-dice-d6"
    />
    <div class="background-dice" />
  </div>
  <div class="background-navbar-padding" />
</template>

<script setup lang="ts">
let bgDiceArray = $ref([]);
let bgD6Array = $ref([]);
const bgDiceNumber = 15;
const bgD6Number = 20;

for (let i = 0; i < bgDiceNumber; i++) {
  const x = (100 / bgDiceNumber) * i + (Math.random() - 0.5) * 2;
  const radial = (360 / bgDiceNumber) * i + (Math.random() - 0.5) * 2;

  let d20 = {
    // left: `${Math.random() * 100}%`,
    left: `${x}%`,
    top: `${50 + Math.sin(radial) * 10}%`,
    color: `hsla(${Math.random() * 360} 100% 50% / .2)`,
  };
  bgDiceArray.push(d20);
}
for (let i = 0; i < bgD6Number; i++) {
  const x = (100 / bgD6Number) * i + (Math.random() - 0.5) * 2;
  const radial = (360 / bgD6Number) * i + (Math.random() - 0.5) * 2;

  let d6 = {
    // left: `${Math.random() * 100}%`,
    left: `${x}%`,
    top: `${50 + Math.sin(radial) * 10}%`,
    color: `hsla(${Math.random() * 360} 100% 50% / .2)`,
  };
  bgD6Array.push(d6);
}
</script>

<style scoped lang="scss">
.d20-bg {
  position: absolute;
  font-size: 5rem;
}
.d6-bg {
  position: absolute;
  font-size: 3rem;
}
.background-navbar-padding {
  width: calc(100vw - (100vw - 100%));
  height: 6rem;
}
.background-dice-container {
  position: fixed;
  left: 0;
  top: 0;
  z-index: -2;
  width: calc(100vw - (100vw - 100%));
  height: 100vh;
  overflow: hidden;
}
.background-dice {
  backdrop-filter: blur(5px);
  position: absolute;
  z-index: 0;
  width: calc(100vw - (100vw - 100%));
  min-height: 100vh;
  @include themed() {
    background: radial-gradient(ellipse at left, rgb(t($primary-color), 0.3), transparent),
      radial-gradient(ellipse at right, rgb(t($complementary-500), 0.2), transparent);
  }
}
</style>
