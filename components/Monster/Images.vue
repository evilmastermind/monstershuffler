<template>
  <div class="images"></div>
</template>

<script setup lang="ts">
import type { Character } from "@/types";

inject("character") as Character;
</script>

<style scoped>
.images {
  overflow: hidden;
  width: 100%;
  height: 500px;
  background-image: url(@/assets/images/background4.png);
  background-size: auto 950px;
  background-position: top -100px left -400px;
  background-repeat: no-repeat;
  mask-image: url(@/assets/images/monster/test-mask.png);
  mask-repeat: no-repeat;
  mask-position: bottom center;
  mask-origin: stroke-box;
}
</style>
