<template>
  <!-- TODO: I transformed this into a button to make it accessible, but it's not enough: 
    @click should be a toggle for instance -->
  <button
    class="dropdown"
    :aria-label="$t('navbar.menuTitle')"
    @mouseenter="mouseOver"
    @mouseleave="mouseLeave"
    @click="toggle"
  >
    <slot />
    <transition :name="transition" appear>
      <div
        class="dropdown-menu rounded drop-shadow-lg py-2"
        :class="dropdownMenuClass"
      >
        <slot name="dropdown" />
      </div>
    </transition>
  </button>
</template>

<script setup lang="ts">
import { addUniqueItem, removeItem } from "@/utils";

const dropdownMenuClass = ref(["dropdown-menu-hidden"]);

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

const isMouseOver = ref(false);

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
  dropdownMenuClass.value.push(props.direction);
} else {
  dropdownMenuClass.value.push("bottomleft");
}

function mouseOver() {
  if (props.hover === true) {
    removeItem(dropdownMenuClass.value, "dropdown-menu-hidden");
    isMouseOver.value = true;
  }
}
function mouseLeave() {
  if (props.hover === true) {
    addUniqueItem(dropdownMenuClass.value, "dropdown-menu-hidden");
    isMouseOver.value = false;
  }
}

function toggle() {
  if (dropdownMenuClass.value.includes("dropdown-menu-hidden")) {
    removeItem(dropdownMenuClass.value, "dropdown-menu-hidden");
  } else if (!isMouseOver.value) {
    addUniqueItem(dropdownMenuClass.value, "dropdown-menu-hidden");
  }
  isMouseOver.value = false;
}
</script>

<style lang="scss">
.dropdown {
  position: relative;
  overflow: visible;
  border: 0px solid transparent;
  background-color: transparent;
  z-index: 9990;
}
.dropdown-menu > * {
  display: block;
  padding: theme("spacing.1") theme("spacing.2");
}
.dropdown-menu {
  position: absolute;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  width: theme("spacing.11");
  align-items: stretch;
  text-align: left;
  // border-radius: 5px;
  background-color: theme("colors.background.100");
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
