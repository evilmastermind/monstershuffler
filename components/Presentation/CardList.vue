<template>
  <div class="card-list-container">
    <div
      class="card-list-background"
      :style="{
        backgroundImage: `url(${p.image})`,
        maskImage: `url(/images/masks/top-${maskNumber}.png),
                    url(/images/masks/bottom-${maskNumber}.webp)`,
      }"
    />
    <div class="lg-max">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const p = defineProps({
  image: {
    type: String,
    required: true,
  },
  maskNumber: {
    type: Number,
    default: 2,
  },
});
</script>

<style scoped>
.card-list-container {
  position: relative;
}
.card-list-background {
  position: absolute;
  margin: 1px 0; /* removes the gap between background and the mask (browser bug?) */
  inset: 0;
  background-position: center;
  background-size: cover;
  mask-composite: intersect;
  mask-repeat: repeat-x;
  mask-position: top, bottom;
}
</style>
<style>
.card-list {
  position: relative;
  display: grid;
  grid-template-columns: auto;
  justify-content: center;
  align-items: center;
  z-index: 1;
  @apply py-9 mx-4 gap-6;
}
@media (min-width: theme("screens.md")) {
  .card-list {
    grid-template-columns: 1fr 1fr;
    @apply mx-9;
  }
}
</style>
