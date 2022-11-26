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
const incrementStart = 0.9;
const bgDiceXIncrement = 100 / bgDiceNumber;
const bgD6XIncrement = 100 / bgD6Number;

let x = 0;
let incrementDifference = (incrementStart * 2) / bgDiceNumber;
for (let i = 0; i < bgDiceNumber; i++) {
  const increment = incrementStart - incrementDifference * i + 1;
  const radial = (360 / bgDiceNumber) * i + (Math.random() - 0.5) * 1;
  const size = 15 - 14 * (i / bgDiceNumber);
  if (i) {
    x = x + bgDiceXIncrement * increment;
  }
  console.log(`D20 x ${x}`);

  let d20 = {
    // left: `${Math.random() * 100}%`,
    left: `${x}%`,
    top: `${50 + Math.sin(radial) * 10 * increment}%`,
    color: `hsla(${Math.random() * 360} 100% 50% / .2)`,
    fontSize: `${size}rem`,
  };
  bgDiceArray.push(d20);
}

x = 0;
incrementDifference = (incrementStart * 2) / bgD6Number;
for (let i = 0; i < bgD6Number; i++) {
  const increment = incrementStart - incrementDifference * i + 1;
  let radial = (360 / bgD6Number) * i + (Math.random() - 0.5) * 1;
  const size = 8 - 6.5 * (i / bgD6Number);
  if (i) {
    x = x + bgD6XIncrement * increment;
  }
  console.log(`D6 x ${x}`);
  console.warn(increment);

  let d6 = {
    // left: `${Math.random() * 100}%`,
    left: `${x}%`,
    top: `${50 + Math.sin(radial) * 10 * increment}%`,
    color: `hsla(${Math.random() * 360} 100% 50% / .2)`,
    fontSize: `${size}rem`,
  };
  bgD6Array.push(d6);
}
</script>

<style scoped lang="scss">
.d20-bg {
  position: absolute;
}
.d6-bg {
  position: absolute;
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
