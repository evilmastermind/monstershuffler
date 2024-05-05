<template>
  <div>
    <div v-if="isEditorModeEnabled" class="p-6">
      <div class="image-options">
        <MSRangeSlider
          v-model="image.elementHeightPx"
          :label="$t('editor.image.frameHeight')"
          :min="100"
          :max="900"
          :step="10"
          unit="px"
        />
      </div>
    </div>
    <div class="image-container">
      <div v-if="isEditorModeEnabled" class="image-outline" />
      <div
        ref="imageRef"
        class="image"
        :style="{
          height: `${image.elementHeightPx}px`,
          backgroundImage: `url(/images/backgrounds/${image.url}.png)`,
          backgroundSize: `cover`,
          backgroundPosition: `${image.backgroundPositionLeftPx}% ${image.backgroundPositionTopPx}%`,
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { Character } from "@/types";
import { getTemporaryImage } from "@/other";

const editor = useMonsterEditorStore();
const imageRef = ref<unknown>(null);

const character = inject("character") as Character;
const { isEditorModeEnabled } = storeToRefs(editor);
const image = ref(getTemporaryImage(character));

/**
 * IMAGE EDITOR
 */
onMounted(() => {
  const image = new Image();
  // Check the resolution once the image is loaded
  image.onload = function () {
    console.log(
      "Image resolution:",
      image.naturalWidth,
      "x",
      image.naturalHeight
    );
  };
});
</script>

<style scoped>
/*
.images {
  overflow: hidden;
  width: 100%;
  height: 500px;
  background-image: url(@/assets/images/background7.png);
  background-size: auto 950px;
  background-position: top -100px left -400px;
  background-repeat: no-repeat;
  mask-image: url(@/assets/images/monster/test-mask.png);
  mask-repeat: no-repeat;
  mask-position: bottom center;
  mask-origin: stroke-box;
}
*/
.image-container {
  position: relative;
}
.image {
  overflow: hidden;
  width: 100%;
  height: 500px;
  background-size: auto 500px;
  background-position: top 40% left 100%;
  background-repeat: no-repeat;
  mask-image: url(@/assets/images/monster/test-mask.png);
  mask-repeat: no-repeat;
  mask-position: bottom center;
  mask-origin: stroke-box;
}
/*.image {
  position: relative;
  width: 100%;
  z-index: 1;
  height: 500px;
  background-image: url(@/assets/images/background22.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  mask-image: url(@/assets/images/monster/test-mask.png);
  mask-repeat: repeat;
  mask-position: bottom center;
  mask-origin: view-box;
}*/
.image-mask {
  mask-image: url(@/assets/images/monster/test-mask.png);
  mask-repeat: repeat;
  mask-position: bottom center;
  mask-origin: view-box;
}
.image-outline {
  position: absolute;
  z-index: 100;
  inset: 0px;
  border: 4px solid;
  cursor: move;
  @apply border-primary-700;
}
.image-outline:hover {
  @apply border-primary-500;
}
.image-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
</style>
