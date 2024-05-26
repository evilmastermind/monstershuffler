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
            top: `${token.topPx}px`,
            left: `${token.leftPx}px`,
            width: `${token.widthPx}px`,
            height: `${token.widthPx}px`,
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
        ref="canvas"
        class="image"
        :style="{
          height: `${
            isEditorModeEnabled
              ? image.canvasHeightPx
              : computedImage.canvasHeightPx
          }px`,
          backgroundImage: `url(/images/backgrounds/${image.url}.webp)`,
          backgroundSize: `auto ${computedImage.imageHeightPx}px`,
          backgroundPosition: `${computedImage.imagePositionLeftPx}px ${computedImage.imagePositionTopPx}px`,
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

const MOBILE_PERC = 0.6;

const editor = useMonsterEditorStore();
const { width, smAndDown } = useScreen();
const canvas = ref<HTMLElement | null>(null);

const character = inject("character") as Ref<Character>;
const { currentEditorMode } = storeToRefs(editor);
const originalImageWidth = ref();
const originalImageHeight = ref();

const image = ref<Image>(getTemporaryImage(character.value, canvas));
const token = ref(image.value.token || createToken(image, canvas));

const isEditorModeEnabled = computed<boolean>(() => {
  return currentEditorMode.value === "image";
});
const computedImage = computed<Image>(() => {
  if (isEditorModeEnabled.value || canvas.value === null) {
    return {
      url: image.value.url,
      imageHeightPx: image.value.imageHeightPx || 500,
      imagePositionLeftPx: image.value.imagePositionLeftPx || 0,
      imagePositionTopPx: image.value.imagePositionTopPx || 0,
    };
  }
  return calculateComputedImage(
    image,
    canvas as Ref<HTMLElement>,
    originalImageWidth,
    originalImageHeight,
    width.value
  );
});

function calculateComputedImage(
  image: Ref<Image>,
  canvas: Ref<HTMLElement>,
  originalImageWidth: Ref<number>,
  originalImageHeight: Ref<number>,
  width: number // this is used to trigger computedImage's recalculation
): Image {
  // This function recalculates the image position when the screen width
  // changes, so the part of the image where the token is placed remains
  // visible in all screen sizes.
  //
  //               C A N V A S
  //  _______________________________________________________
  // |              |             |                          |
  // | token.leftPx | token width | other part of the canvas |
  // |              |             |                          |
  // |______________|_____________|__________________________|

  // ------------ width --------------------------------------
  // (token.leftPx + other part)
  const canvasWidthMinusTokenWidth =
    (image.value?.canvasWidthPx || 1016) - (image.value.token?.widthPx || 0);

  // x / canvasWidthMinusTokenWidth
  const tokenLeftPx = image.value.token?.leftPx || 0;
  const proportionsOfTheWidthBeforeTheToken =
    canvasWidthMinusTokenWidth !== 0
      ? tokenLeftPx / canvasWidthMinusTokenWidth
      : 0;

  // calculate the new canvasWidthMinusTokenWidth
  const newCanvasWidthMinusTokenWidth =
    canvas.value.clientWidth - token.value.widthPx;

  // TODO: check if newCanvasWidthMinusTokenWidth is < 0 (if so, you need to resize the token too)

  // calculate the new tokenLeftPx
  const newTokenLeftPx =
    proportionsOfTheWidthBeforeTheToken * newCanvasWidthMinusTokenWidth;

  // calculate the token position difference
  const tokenPositionLeftDifference = newTokenLeftPx - tokenLeftPx;

  // new image position left
  let imagePositionLeftPx =
    (image.value.imagePositionLeftPx || 0) + tokenPositionLeftDifference;

  // ------------ height -------------------------------------
  // (token.topPx + other part)
  const canvasHeightMinusTokenWidth =
    (image.value?.canvasHeightPx || 500) - (image.value.token?.widthPx || 0);

  // x / canvasHeightMinusTokenWidth
  const tokenTopPx = image.value.token?.topPx || 0;
  const proportionsOfTheHeightBeforeTheToken =
    canvasHeightMinusTokenWidth !== 0
      ? tokenTopPx / canvasHeightMinusTokenWidth
      : 0;

  // calculate the new canvasHeightMinusTokenWidth
  const newCanvasHeightMinusTokenWidth =
    canvas.value.clientHeight - token.value.widthPx;

  // calculate the new tokenTopPx
  const newTokenTopPx =
    proportionsOfTheHeightBeforeTheToken * newCanvasHeightMinusTokenWidth;

  // calculate the token position difference
  const tokenPositionTopDifference = newTokenTopPx - tokenTopPx;

  // new image position top
  let imagePositionTopPx =
    (image.value.imagePositionTopPx || 0) + tokenPositionTopDifference;

  // --- fixing image size -----------------------------------
  let canvasHeightPx = image.value.canvasHeightPx || 500;
  let imageHeightPx = image.value.imageHeightPx || 500;

  canvasHeightPx = smAndDown.value
    ? canvasHeightPx * MOBILE_PERC
    : canvasHeightPx;

  imageHeightPx = smAndDown.value ? imageHeightPx * MOBILE_PERC : imageHeightPx;

  imagePositionLeftPx = smAndDown.value
    ? imagePositionLeftPx * MOBILE_PERC
    : imagePositionLeftPx;

  imagePositionTopPx = smAndDown.value
    ? imagePositionTopPx * MOBILE_PERC
    : imagePositionTopPx;

  const newImage = {
    url: image.value.url,
    canvasHeightPx,
    imageHeightPx,
    imagePositionLeftPx,
    imagePositionTopPx,
  };

  fixImageHeight(
    newImage,
    canvas.value.clientWidth,
    canvasHeightPx,
    originalImageWidth.value,
    originalImageHeight.value
  );
  fixImagePosition(
    newImage,
    canvas.value.clientWidth,
    canvasHeightPx,
    originalImageWidth.value,
    originalImageHeight.value
  );

  return newImage;
}

// image composables
const { startDragY } = useImageDragY(
  image,
  canvas,
  originalImageWidth,
  originalImageHeight
);
const { startMoveXY } = useImageMoveXY(
  image,
  canvas,
  originalImageWidth,
  originalImageHeight
);
const { startResize } = useImageResize(
  image,
  canvas,
  originalImageWidth,
  originalImageHeight
);
// token composables
const { startMoveTokenXY } = useTokenMoveXY(image, token, canvas);
const { startTokenResize } = useTokenResize(token, canvas);

watch(width, () => {
  if (isEditorModeEnabled.value) {
    // Fix the image height and position when the screen width changes
    fixImageHeight(
      image.value,
      canvas.value?.clientWidth || 0,
      canvas.value?.clientHeight || 0,
      originalImageWidth.value,
      originalImageHeight.value
    );
    fixImagePosition(
      image.value,
      canvas.value?.clientWidth || 0,
      canvas.value?.clientHeight || 0,
      originalImageWidth.value,
      originalImageHeight.value
    );
  }
});

// watch(isEditorModeEnabled, () => {
//   console.log(JSON.parse(JSON.stringify(image.value, null, 2)));
// });

onMounted(() => {
  const imageElement = new Image();
  // Check the resolution once the image is loaded
  imageElement.src = `/images/backgrounds/${image.value.url}.webp`;
  imageElement.onload = () => {
    originalImageHeight.value ??= imageElement.naturalHeight;
    originalImageWidth.value ??= imageElement.naturalWidth;
  };
  // imageElement.onload = function () {
  //   originalImageWidth.value = imageElement.naturalWidth;
  //   originalImageHeight.value = imageElement.naturalHeight;
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
  width: 6px;
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
  height: 6px;
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
  width: 4px;
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
