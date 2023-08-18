<template>
  <div class="background">
    <div class="background-before" :class="[`bg-${ethical}-100`]" />
    <div class="content p-3" :class="selectable ? 'selectable' : ''">
      <slot />
    </div>
    <div class="background-after" :class="[`bg-${ethical}-100`]" />
  </div>
</template>

<script setup lang="ts">
const backgrounds = ["bg-evil-100", "bg-good-100", "bg-neutral-100"];
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
  @apply bg-background-card rounded-xl shadow-md;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1), inset 0 0 55px rgba(0, 0, 0, 0.05);
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
  background-color: theme("colors.background");
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
