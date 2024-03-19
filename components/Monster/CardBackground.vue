<template>
  <div class="background">
    <!-- <div class="background-before" :class="[`bg-${ethical}-100`]" /> -->
    <div class="content p-3" :class="selectable ? 'selectable' : ''">
      <slot />
      <!-- <img
        v-if="ethical === 'chaotic'"
        class="ethical-symbol"
        :class="moral"
        src="@/assets/images/symbol-chaos.png"
      />
      <img
        v-else-if="ethical === 'lawful'"
        class="ethical-symbol"
        :class="moral"
        src="@/assets/images/symbol-law.png"
      /> -->
    </div>
    <!-- <div class="background-after" :class="[`bg-${ethical}-50`]" /> -->
  </div>
</template>

<script setup lang="ts">
const backgrounds = ["bg-evil-50", "bg-good-50", "bg-neutral-50"];
const p = defineProps({
  ethical: {
    type: String,
    default: "neutral",
  },
  moral: {
    type: String,
    default: "neutral",
  },
  selectable: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.background {
  position: relative;
  @apply bg-background-card rounded-xl;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1), inset 0 0 55px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}
.content {
  font-size: 15px;
  height: 100%;
}
.selectable {
  @apply cursor-pointer rounded-xl;
  transition: background-color 0.09s ease-in-out;
}
.selectable:hover {
  @apply bg-background-100;
}
.ethical-symbol {
  position: absolute;
  bottom: -100px;
  right: -200px;
  width: 500px;
}
.good {
  filter: hue-rotate(-120deg);
}
.evil {
}
.neutral {
  filter: hue-rotate(60deg);
}
// .background {
//   @apply relative;
// }
// .background-before,
// .background-after {
//   position: absolute;
//   display: block;
//   content: "";
//   width: 100%;
//   height: 6px;
// }
// .background::after {
//   bottom: 0;
// }
// .content {
//   height: 100%;
//   width: calc(100% - 6px);
//   @apply bg-background-card mx-auto;
// }
</style>
