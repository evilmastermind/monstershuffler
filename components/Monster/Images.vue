<template>
  <div>
    <div class="image-container">
      <div v-if="isEditorModeEnabled">
        <div class="image-options"></div>
      </div>
      <div
        v-if="isEditorModeEnabled"
        class="image-outline"
        @mousedown="startMoveXY"
        @wheel="startResize"
        @keyup.-="startResize"
        @keyup.+="startResize"
      >
        <div class="image-drag" @mousedown.stop="startDragY" />
        <div
          v-if="isEditorModeEnabled"
          class="token"
          :style="{
            top: `${token?.topPx}px`,
            left: `${token?.leftPx}px`,
            width: `${token?.widthPx}px`,
            height: `${token?.widthPx}px`,
          }"
          @mousedown.stop="startMoveTokenXY"
        >
          <div class="token-circle">
            <div class="token-drag-right" @mousedown.stop="startTokenResize" />
            <div class="token-drag-down" @mousedown.stop="startTokenResize" />
            <div class="token-drag-trick" @mousedown.stop="startTokenResize" />
          </div>
        </div>
      </div>
      <div
        ref="imageRef"
        class="image"
        :style="{
          height: `${image.canvasHeightPx || CANVASDEFAULTHEIGHT}px`,
          backgroundImage: `url(/images/backgrounds/${image.url}.png)`,
          backgroundSize: `auto ${image.imageHeightPx || originalImageWidth}px`,
          backgroundPosition: `${image.imagePositionLeftPx || 0}px ${
            image.imagePositionTopPx || 0
          }px`,
        }"
      />
    </div>
    <div v-if="isEditorModeEnabled" class="my-6" />
  </div>
</template>

<script setup lang="ts">
import type { Character, Image } from "@/types";
import { getTemporaryImage } from "@/other";
import { fixImageHeight, fixImagePosition } from "@/utils";

const TOKENDEFAULTWIDTH = 100;
const CANVASDEFAULTHEIGHT = 500;

const editor = useMonsterEditorStore();
const imageRef = ref<HTMLElement | null>(null);

const character = inject("character") as Ref<Character>;
const { isEditorModeEnabled } = storeToRefs(editor);
const originalImageWidth = ref(1456);
const originalImageHeight = ref(832);
const image = ref<Image>(getTemporaryImage(character.value));
const token = ref(image.value.token || createToken(image, imageRef));

const { startDragY } = useImageDragY(
  image,
  imageRef,
  originalImageWidth.value,
  originalImageHeight.value
);
const { startMoveXY } = useImageMoveXY(
  image,
  imageRef,
  originalImageWidth.value,
  originalImageHeight.value
);
const { startMoveTokenXY } = useTokenMoveXY(token, imageRef);
const { startTokenResize } = useTokenResize(token, imageRef);
const { startResize } = useImageResize(
  image,
  imageRef,
  originalImageWidth.value,
  originalImageHeight.value
);
const { width } = useScreen();

const canvasCenterY = computed(() => {
  return (
    (imageRef.value?.clientHeight || 0) / 2 -
    (image.value.token?.widthPx || TOKENDEFAULTWIDTH) / 2
  );
});

const canvasCenterX = computed(() => {
  return (
    (imageRef.value?.clientWidth || 0) / 2 -
    (image.value.token?.widthPx || TOKENDEFAULTWIDTH) / 2
  );
});

watch(width, () => {
  fixImageHeight(
    image,
    imageRef.value?.clientWidth || 0,
    imageRef.value?.clientHeight || 0,
    originalImageWidth.value,
    originalImageHeight.value
  );
  fixImagePosition(
    image,
    imageRef.value?.clientWidth || 0,
    imageRef.value?.clientHeight || 0,
    originalImageWidth.value,
    originalImageHeight.value
  );
});

onMounted(() => {
  const imageElement = new Image();
  // Check the resolution once the image is loaded
  imageElement.src = `/images/backgrounds/${image.value.url}.png`;
  imageElement.onload = function () {
    originalImageWidth.value = imageElement.naturalWidth;
    originalImageHeight.value = imageElement.naturalHeight;
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
  border: 3px solid;
  cursor: move;
  border-radius: 2px;
  @apply border-primary-700;
}
.token {
  position: absolute;
  z-index: 101;
  cursor: move;
  border: 3px solid;
  border-radius: 50%;
  box-shadow: 0 0 40px 2px black;
  @apply border-primary-700;
}
.token-drag-right {
  position: absolute;
  z-index: 102;
  bottom: -3px;
  right: -3px;
  width: 8px;
  height: 20px;
  cursor: se-resize;
  border: 1px solid;
  border-radius: 2px;
  @apply bg-primary-500 border-primary-700;
}
.token-drag-down {
  position: absolute;
  z-index: 102;
  bottom: -3px;
  right: -3px;
  width: 20px;
  height: 8px;
  cursor: se-resize;
  border: 1px solid;
  border-radius: 2px;
  @apply bg-primary-500 border-primary-700;
}
.token-drag-trick {
  position: absolute;
  z-index: 102;
  bottom: -2px;
  right: -2px;
  width: 6px;
  height: 15px;
  cursor: se-resize;
  @apply bg-primary-500;
}
.image-drag {
  position: absolute;
  z-index: 100;
  top: calc(100% - 3px);
  left: calc(50% - 60px);
  width: 120px;
  height: 8px;
  cursor: ns-resize;
  border: 1px solid;
  border-radius: 2px;
  @apply bg-primary-500 border-primary-700;
}
.image-drag:hover {
  @apply bg-primary-300;
}
.image-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
</style>
