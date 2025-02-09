<template>
  <PresentationThumbnail>
    <div class="cute-stat-block-container">
      <Icon class="cute-stat-block-cog-o-1" name="lucide:cog" />
      <Icon class="cute-stat-block-cog-o-2" name="heroicons:cog-solid" />
      <Icon class="cute-stat-block-cog-o-3" name="game-icons:cog" />
      <div class="cute-stat-block-border" />
      <div class="cute-stat-block">
        <div class="cute-stat-block-gradient" />
        <p class="cute-stat-block-name">Dude</p>
        <p class="cute-stat-block-meta">Humanoid</p>
        <Icon class="cute-stat-block-cog-1" name="lucide:cog" />
        <Icon class="cute-stat-block-cog-2" name="heroicons:cog-solid" />
        <Icon class="cute-stat-block-cog-3" name="game-icons:cog" />
      </div>
      <div class="cute-stat-block-border" />
    </div>
  </PresentationThumbnail>
</template>

<script setup lang="ts"></script>

<style scoped>
.cute-stat-block-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 140px;
  @apply bg-stone-200;
}
.cute-stat-block {
  position: relative;
  background-color: #fff8dc;
  background-image: url("@/public/images/monster/paper-texture.webp");
  width: 66px;
  height: 100px;
  @apply shadow-xl px-1;
}
.cute-stat-block-border {
  position: relative;
  height: 4px;
  width: 70px;
  border: 1px solid #000;
  background-position: top left;
  background-repeat: repeat;
  background-image: url("@/public/images/monster/sticks2.webp");
}
.cute-stat-block-name {
  position: relative;
  text-align: left;
  font-size: 1em;
  line-height: 1;
  font-family: "MrsEavesSmallCaps", serif;
  @apply mt-1 text-red-950;
}
.cute-stat-block-meta {
  position: relative;
  text-align: left;
  font-size: 0.7em;
  font-family: "ScalaSansOffc", sans-serif;
  font-style: italic;
  line-height: 1;
  @apply text-stone-600;
}
.cute-stat-block-cog-1 {
  position: absolute;
  bottom: 4px;
  right: 4px;
  font-size: 2.5em;
  animation: rotate-left 2s infinite linear;
  @apply text-red-950/20;
}
.cute-stat-block-cog-2 {
  position: absolute;
  bottom: 26px;
  left: 2px;
  font-size: 2em;
  animation: rotate-right 2s infinite linear;
  @apply text-red-950/20;
}
.cute-stat-block-cog-3 {
  position: absolute;
  bottom: 44px;
  right: 20px;
  font-size: 1.2em;
  animation: rotate-left 2s infinite linear;
  @apply text-yellow-800/25;
}
.cute-stat-block-cog-o-1 {
  position: absolute;
  bottom: -50px;
  right: -50px;
  font-size: 8em;
  animation: rotate-left 10s infinite linear;
  @apply text-stone-300;
}
.cute-stat-block-cog-o-2 {
  position: absolute;
  bottom: 20px;
  left: -35px;
  font-size: 7em;
  animation: rotate-right 15s infinite linear;
  @apply text-stone-300;
}
.cute-stat-block-cog-o-3 {
  position: absolute;
  top: -25px;
  right: -25px;
  font-size: 5em;
  animation: rotate-left 7s infinite linear;
  @apply text-stone-300;
}
.cute-stat-block-gradient {
  position: absolute;
  inset: 0;
  background: url("@/public/images/monster/semitransparent.webp");
  background-size: 150px auto;
  background-repeat: repeat-x;
}

@keyframes rotate-left {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
@keyframes rotate-right {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
