<template>
  <div ref="card" class="tool-representation">
    <slot />
    <div class="glow" />
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
    scale3d(1.03, 1.03, 1.03)
    rotate3d(
      ${-center.y / 100},
      ${center.x / 100},
      0,
      ${Math.log(distance) * 3}deg
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
.tool-representation {
  position: relative;
  transition-duration: 300ms;
  transition-property: transform, box-shadow;
  transition-timing-function: ease-out;
  transform: rotate3d(0);
  overflow: hidden;
  width: 100px;
  height: 140px;
  @apply shadow-sm rounded;
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
</style>
