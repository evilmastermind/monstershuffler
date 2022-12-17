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
import { onMounted, onBeforeUnmount, nextTick } from "vue";
import { $ref, $computed } from "vue/macros";
import { debounce } from "@/utils/functions";

type DiceStyle = {
  left: string;
  top: string;
  color: string;
  fontSize: string;
}

const incrementStart = 0.9;
let bgDiceArray: DiceStyle[] = $ref([]);
let bgD6Array: DiceStyle[]  = $ref([]);
let windowWidth = $ref(window.innerWidth);
let generateBackgroundDebounce = debounce(() => generateBackground(), 100 );

const bgDiceNumber = $computed(() => Math.ceil(windowWidth/100));
const bgD6Number = $computed(() => Math.ceil(windowWidth/130));
const bgDiceXIncrement = $computed(() => 100 / bgDiceNumber);
const bgD6XIncrement = $computed(() => 100 / bgD6Number);


onMounted(async () => {
  await nextTick();
  window.addEventListener("resize", onResize);
  generateBackground();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize); 
});

function onResize() {
  generateBackgroundDebounce();
}

function generateBackground() {
  windowWidth = window.innerWidth;
  let bgDiceArrayTemp: DiceStyle[] = [];
  let x = 0;
  let incrementDifference = (incrementStart * 2) / bgDiceNumber;
  for (let i = 0; i < bgDiceNumber; i++) {
    const increment = incrementStart - incrementDifference * i + 1;
    const radial = ( 18 / bgDiceNumber + Math.random()/5) * i;
    const size = 15 - 14 * (i / bgDiceNumber);
    if (i) {
      x = x + bgDiceXIncrement * increment * (1 + Math.random()/50);
    }

    let d20: DiceStyle = {
      // left: `${Math.random() * 100}%`,
      left: `${Math.floor(x)}%`,
      top: `${Math.floor(50 + Math.sin(radial) * 10 * increment)}%`,
      color: `hsla(${Math.floor(Math.random() * 360)} 100% 50% / .2)`,
      fontSize: `${Math.floor(size)}rem`,
    };
    bgDiceArrayTemp.push(d20);
  }

  bgDiceArray = [ ...bgDiceArrayTemp];
  
  let bgD6ArrayTemp: DiceStyle[] = [];

  x = 0;
  incrementDifference = (incrementStart * 2) / bgD6Number;
  for (let i = 0; i < bgD6Number; i++) {
    const increment = incrementStart - incrementDifference * i + 1;
    const radial = ( 18 / bgD6Number + Math.random()/5) * i ;
    const size = 8 - 6.5 * (i / bgD6Number);
    if (i) {
      x = x + bgD6XIncrement * increment * (1 + Math.random()/50);
    }

    let d6: DiceStyle = {
      // left: `${Math.random() * 100}%`,
      left: `${Math.floor(x)}%`,
      top: `${Math.floor(50 + Math.sin(radial) * 10 * increment)}%`,
      color: `hsla(${Math.floor(Math.random() * 360)} 100% 50% / .2)`,
      fontSize: `${Math.floor(size)}rem`,
    };
    bgD6ArrayTemp.push(d6);
  }

  bgD6Array = [ ...bgD6ArrayTemp];
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
