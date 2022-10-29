<template>
  <div
    class="dropdown"
    @mouseover="mouseOver"
    @mouseleave="mouseLeave"
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
  </div>
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
  }
});
const directionsAllowed = ["rightup", "rightdown", "leftup", "leftdown", "bottomright", "bottomleft", "topright", "topleft"];

if(directionsAllowed.includes(props.direction)) {
  dropdownMenuClass.push(props.direction);
}
else {
  dropdownMenuClass.push("bottomleft");
}

function mouseOver() {
  console.log("poop");
  if (props.hover === true) {
    removeItem(dropdownMenuClass,"dropdown-menu-hidden");
  }
}
function mouseLeave() {
  if (props.hover === true) {
    dropdownMenuClass.push("dropdown-menu-hidden");
  }
}

function removeItem<T>(anArray: Array<T>, aClass: T) {
  const index = anArray.indexOf(aClass);
  if( index > -1) {
    anArray.splice(index,1);
  }
  return anArray;
}
</script>

<style lang="scss">
.dropdown {
  position: relative;
  overflow: visible;
}
.dropdown-menu {
  position:absolute;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  width: 200px;
  align-items: stretch;
  border-radius: 5px;
  @include themed() {
    background-color: t($background);
    box-shadow: 0 8px 16px 0 rgb(0 0 0 / 20%);
  }
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


</style>