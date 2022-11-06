<template>
  <div
    ref="dropdown"
    class="dropdown"
    :class="{ dropup: top }"
    @mouseleave="mouseLeave"
    @mouseover="mouseOver"
    @mouseenter="mouseEnter"
    @click="toggleMenu"
  >
    <slot />
    <transition :name="transition">
      <div
        v-show="value"
        ref="dropdown"
        class="dropdown-menu show"
        :class="{ 'dropdown-menu-right': right}"
        :style="styles"
        @mouseleave="startTimer"
        @mouseenter="stopTimer"
        @click.stop
      >
        <slot name="dropdown" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onUnmounted } from "vue";
import type { Ref } from "vue";
// This is a customized version of innologica's Dropdown menu
// https://innologica.github.io/vue-dropdown-menu

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  right: {
    type: Boolean,
    default: false,
  },
  hover: {
    type: Boolean,
    default: true,
  },
  hoverTime: {
    type: Number,
    default: 100,
  },
  hoverTimeout: {
    type: Number,
    default: 500
  },
  styles: {
    type: Object,
    default() {
      return {};
    },
  },
  interactive: {
    type: Boolean,
    default: false,
  },
  transition: {
    type: String,
    default: "",
  },
  closeOnClickOutside: {
    type: Boolean,
    default: true,
  }
});
// todo: replace any with DOM node type (what's the right type?)
const dropdown: Ref<any> = ref(null); 
const emit = defineEmits(["input"]);
let hovering: Ref<boolean> = ref(false);
let top: Ref<boolean> = ref(false);
let hoverOpenTimer:any = null;
let hoverTimer:any = null;

onUnmounted(() => document.body.removeEventListener("click", closeMenu));

watch(() => props.value, (newValue) => {
  if (newValue) {
    top.value = false;
    nextTick(() => {
      let rect = dropdown?.value?.getBoundingClientRect() || null;
      if(rect) {
        let window_height = (window.innerHeight || document.documentElement.clientHeight);
        top.value = (rect.bottom > window_height) && (rect.top >= rect.height);
      }
    });
  }
});
watch(() => props.interactive, () => {
  if(typeof document === "object") {
    props.value ? 
      document.body.addEventListener("click", closeMenu) :
      document.body.removeEventListener("click", closeMenu);
  }
}, { immediate: true });

function mouseEnter() {
  stopTimer();
  if (props.hover && props.hoverTime > 0 && !props.value) {
    // console.log('start open timer', this.hover_time)
    hoverOpenTimer = setTimeout(() => {
      emit("input", true);
      //disable for a moment
      hovering.value = true;
      setTimeout(() => {
        hovering.value = false;
      }, props.hoverTimeout);
    }, props.hoverTime);
  }
  if (props.hover && !props.value && props.hoverTime === 0) {
    hovering.value = true;
    setTimeout(() => {
      hovering.value = false;
    }, props.hoverTimeout);
    emit("input", true);
  }
}


function mouseLeave () {
  // console.log('mouseLeave', $event.target)
  if (!hoverTimer) { //left the link and no time active
    startTimer();
  }
  if (props.hoverTime > 0 && props.hover) {
    // console.log('clear hover timer')
    clearTimeout(hoverOpenTimer);
  }
}
function  mouseOver () {
  stopTimer();
  // console.log('mouseOver')
}
function  closeMenu ($event: Event) {
  if (!$event || !dropdown?.value?.contains($event.target)) {
    if (props.value && props.closeOnClickOutside) {
      emit("input", false);
    }
  }
}
function toggleMenu () {
  if (hovering.value)
    return;
  if (props.value && props.hover)
    return;
  emit("input", !props.value);
}
function  stopTimer () {
  // console.log('stop timer')
  clearTimeout(hoverTimer);
  hoverTimer = null;
}
function  startTimer () {
  // console.log('start timer')
  if (!props.interactive)
    hoverTimer = setTimeout(closeMenu, props.hoverTimeout);
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
  justify-content: center;
  width: 300px;
  align-items: center;
  left: 0;
  @include themed() {
    background-color: t($background);
    box-shadow: 0 8px 16px 0 rgb(0 0 0 / 20%);
  }
}
</style>