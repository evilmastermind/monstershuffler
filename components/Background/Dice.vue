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
  transform: string;
};

const incrementStart = 0.9;
let bgDiceArray: DiceStyle[] = $ref([]);
let bgD6Array: DiceStyle[] = $ref([]);
let windowWidth = $ref(window.innerWidth);
const generateBackgroundDebounce = debounce(() => generateBackground(), 300);

const bgDiceNumber = $computed(() => Math.ceil(windowWidth / 100));
const bgD6Number = $computed(() => Math.ceil(windowWidth / 130));
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
  const bgDiceArrayTemp: DiceStyle[] = [];
  let x = 0;
  let incrementDifference = (incrementStart * 2) / bgDiceNumber;
  for (let i = 0; i < bgDiceNumber; i++) {
    const increment = incrementStart - incrementDifference * i + 1;
    const radial = (18 / bgDiceNumber + Math.random() / 5) * i;
    const size = 15 - 14 * (i / bgDiceNumber);
    if (i) {
      x = x + bgDiceXIncrement * increment * (1 + Math.random() / 50);
    }

    const d20: DiceStyle = {
      // left: `${Math.random() * 100}%`,
      left: `${Math.floor(x)}%`,
      top: `${Math.floor(50 + Math.sin(radial) * 25 * increment)}%`,
      color: `hsla(${(360 / bgDiceNumber) * i} 100% 50% / .1)`,
      fontSize: `${Math.floor(size)}rem`,
      transform: `rotate(${Math.floor(Math.random() * 360)}deg)`,
    };
    bgDiceArrayTemp.push(d20);
  }

  bgDiceArray = [...bgDiceArrayTemp];

  const bgD6ArrayTemp: DiceStyle[] = [];

  x = 0;
  incrementDifference = (incrementStart * 2) / bgD6Number;
  for (let i = 0; i < bgD6Number; i++) {
    const increment = incrementStart - incrementDifference * i + 1;
    const radial = (18 / bgD6Number + Math.random() / 5) * i;
    const size = 8 - 6.5 * (i / bgD6Number);
    if (i) {
      x = x + bgD6XIncrement * increment * (1 + Math.random() / 50);
    }

    const d6: DiceStyle = {
      // left: `${Math.random() * 100}%`,
      left: `${Math.floor(x)}%`,
      top: `${Math.floor(50 + Math.sin(radial) * 25 * increment)}%`,
      color: `hsla(${(360 / bgD6Number) * i} 100% 50% / .1)`,
      fontSize: `${Math.floor(size)}rem`,
      transform: `rotate(${Math.floor(Math.random() * 360)}deg)`,
    };
    bgD6ArrayTemp.push(d6);
  }

  bgD6Array = [...bgD6ArrayTemp];
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
  @apply h-9;
}
.background-dice-container {
  position: fixed;
  left: 0;
  top: 0;
  z-index: -2;
  width: calc(100vw - (100vw - 100%));
  height: 100vh;
  overflow: hidden;
  background-color: #e5e5f7;
  background-size: 10px 10px;
  // background-image: repeating-linear-gradient(45deg, t($background) 0, t($background) 1px, t($background2) 0, t($background2) 50%);
  background-color: theme("colors.background2");
  background: radial-gradient(
      ellipse at 50% 20%,
      theme("colors.primary.100"),
      transparent
    ),
    radial-gradient(ellipse at 70% 80%, theme("colors.background"), transparent),
    radial-gradient(
      ellipse at 30% 80%,
      theme("colors.complementary.200"),
      transparent
    );
}
.background-dice {
  position: absolute;
  z-index: 0;
  width: calc(100vw - (100vw - 100%));
  min-height: 100vh;
  // @include blurred();
}
</style>
