<template>
  <div class="tool-container">
    <div ref="card" class="tool-representation">
      <slot name="image" />
      <div class="glow" />
    </div>
    <div v-if="$slots.default || $slots.title" class="tool-text">
      <h3 v-if="$slots.title" class="static">
        <slot name="title" />
      </h3>
      <p v-if="$slots.default" class="static mt-1">
        <slot name="default" />
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Ignorantly copied and pasted from:
 * https://codepen.io/markmiro/pen/wbqMPa
 */
const card = ref<HTMLElement | null>(null);
let bounds: DOMRect;

function rotateToMouse(e: MouseEvent): void {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const leftX = mouseX - bounds.x;
  const topY = mouseY - bounds.y;
  const center = {
    x: leftX - bounds.width / 2,
    y: topY - bounds.height / 2,
  };
  const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

  if (!card.value) {
    return;
  }

  card.value.style.transform = `
    scale3d(1.07, 1.07, 1.07)
    rotate3d(
      ${center.y / 100},
      ${-center.x / 100},
      0,
      ${Math.log(distance) * 2}deg
    )
  `;

  const glow = card.value.querySelector(".glow") as HTMLElement;
  glow.style.backgroundImage = `
    radial-gradient(
      circle at
      ${center.x * 2 + bounds.width / 2}px
      ${center.y * 2 + bounds.height / 2}px,
      #ffffff55,
      #0000000f
    )
  `;
}

onMounted(() => {
  if (!card.value) {
    return;
  }
  card.value.addEventListener("mouseenter", () => {
    bounds = card.value!.getBoundingClientRect();
    document.addEventListener("mousemove", rotateToMouse);
  });

  card.value.addEventListener("mouseleave", () => {
    document.removeEventListener("mousemove", rotateToMouse);
    card.value!.style.transform = "";
    (card.value!.querySelector(".glow") as HTMLElement).style.background = "";
  });
});

onUnmounted(() => {
  document.removeEventListener("mousemove", rotateToMouse);
});
</script>

<style scoped>
.tool-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  perspective: 1500px;
  @apply gap-6;
}
.tool-text {
  text-align: left;
  max-width: 400px;
}
.tool-representation {
  position: relative;
  transition-duration: 300ms;
  transition-property: transform, box-shadow;
  transition-timing-function: ease-out;
  transform: rotate3d(0);
  overflow: hidden;
  min-width: 100px;
  @apply shadow rounded;
}
.tool-representation:hover {
  transition-duration: 150ms;
  @apply shadow-lg;
}
.tool-representation .glow {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-image: radial-gradient(circle at 50% -20%, #ffffff22, #0000000f);
}

@media (min-width: theme("screens.md")) {
  .tool-container {
    @apply gap-8;
  }
}
</style>
