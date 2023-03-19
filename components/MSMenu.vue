<template>
  <!-- TODO: I transformed this into a button to make it accessible, but it's not enough: 
    @click should be a toggle for instance -->
  <button
    class="dropdown"
    @mouseover="mouseOver"
    @mouseleave="mouseLeave"
    @click="mouseOver"
  >
    <slot />
    <transition :name="transition">
      <div
        class="dropdown-menu"
        :class="dropdownMenuClass"
      >
        <slot name="dropdown" />
      </div>
    </transition>
  </button>
</template>

<script setup lang="ts">
import { $ref } from "vue/macros";

let dropdownMenuClass = $ref(["dropdown-menu-hidden"]);

const props = defineProps({
  transition: {
    type: String,
    default: "",
  },
  hover: {
    type: Boolean,
    default: true,
  },
  direction: {
    type: String,
    default: "bottomleft",
  },
});
const directionsAllowed = [
  "rightup",
  "rightdown",
  "leftup",
  "leftdown",
  "bottomright",
  "bottomleft",
  "topright",
  "topleft",
];

if (directionsAllowed.includes(props.direction)) {
  dropdownMenuClass.push(props.direction);
} else {
  dropdownMenuClass.push("bottomleft");
}

function mouseOver() {
  console.log("poop");
  if (props.hover === true) {
    removeItem(dropdownMenuClass, "dropdown-menu-hidden");
  }
}
function mouseLeave() {
  if (props.hover === true) {
    dropdownMenuClass.push("dropdown-menu-hidden");
  }
}

function removeItem<T>(anArray: Array<T>, aClass: T) {
  const index = anArray.indexOf(aClass);
  if (index > -1) {
    anArray.splice(index, 1);
  }
  return anArray;
}
</script>

<style lang="scss">
.dropdown {
  position: relative;
  overflow: visible;
  border: 0px solid transparent;
  background-color: transparent;
}
.dropdown-menu > * {
  display: block;
  padding: $s-1 $s-2;
}
.dropdown-menu {
  position: absolute;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  width: $s-11;
  align-items: stretch;
  // border-radius: 5px;
  @include themed() {
    background-color: t($background);
  }
  @include shadow-2;
  transform-origin: top center;
  animation: rotateX 200ms ease-in-out forwards;
}
.dropdown-menu-hidden {
  display: none;
}
.rightup {
  bottom: 0;
  left: 100%;
}
.rightdown {
  top: 0;
  left: 100%;
}
.leftup {
  bottom: 0;
  right: 100%;
}
.leftdown {
  top: 0;
  right: 100%;
}
.topleft {
  bottom: 100%;
  right: 0;
}
.topright {
  bottom: 100%;
  left: 0;
}
.bottomleft {
  top: 100%;
  right: 0;
}
.bottomright {
  top: 100%;
  left: 0;
}

@keyframes rotateX {
  0% {
    opacity: 0;
    transform: rotateX(-90deg);
  }
  50% {
    transform: rotateX(-20deg);
  }
  100% {
    opacity: 1;
    transform: rotateX(0deg);
  }
}
</style>
