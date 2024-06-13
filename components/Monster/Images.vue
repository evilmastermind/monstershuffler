<template>
  <div
    class="image-container"
    :class="isEditorModeEnabled ? 'mb-6 elevated' : ''"
  >
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
      <MonsterImagesTools :image class="image-tools" />
      <div
        v-if="rules.width !== 'full'"
        class="image-handle-right"
        @mousedown.stop="startDragX"
      />
      <div
        v-if="rules.height !== 'full'"
        class="image-handle-bottom"
        @mousedown.stop="startDragY"
      />
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
      class="computed-image"
      :style="{
        height: `${canvasHeight}`,
        width: `${canvasWidth}`,
        backgroundSize: `auto ${computedImage.imageHeightPx}px`,
        backgroundPosition: `${computedImage.imagePositionLeftPx}px ${computedImage.imagePositionTopPx}px`,

        backgroundImage: `url(${image.url})`,
        ...mask,
      }"
    >
      <div v-if="isEditorModeEnabled" class="vertical-line" />
      <div v-if="isEditorModeEnabled" class="horizontal-line" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character, Image, Token, ImageRules } from "@/types";
import {
  IMG_MAX_CANVAS_HEIGHT,
  IMG_MAX_CANVAS_WIDTH,
  fixImageSize,
  fixImagePosition,
  calculateComputedImage,
} from "@/utils";
import { getTemporaryImage } from "@/other";

const e = defineEmits(["load", "height"]);
const p = defineProps({
  rules: {
    type: Object as PropType<ImageRules>,
    required: true,
  },
});

const { rules: rulesRef } = toRefs(p);

const editor = useMonsterEditorStore();
const { width, smAndDown } = useScreen();
const canvas = ref<HTMLElement | null>(null);

const character = inject("character") as Ref<Character>;
const { currentEditorMode } = storeToRefs(editor);
const originalImageWidth = ref();
const originalImageHeight = ref();

const image = ref<Image>(getTemporaryImage(character.value, canvas));
const token = ref<Token>(image.value.token || createToken(image, canvas));
const isImageLoading = ref(true);

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
    token,
    canvas as Ref<HTMLElement>,
    smAndDown,
    originalImageWidth,
    originalImageHeight,
    width.value,
    p.rules
  );
});

const canvasHeight = computed<string>(() => {
  let height = "0px";
  if (p.rules.height === "full") {
    height = "100%";
  } else if (isEditorModeEnabled.value) {
    height = `${image.value?.canvasHeightPx || 500}px`;
  } else if (
    p.rules.height === "manual" &&
    computedImage.value.canvasHeightPx &&
    computedImage.value.canvasHeightPx > IMG_MAX_CANVAS_HEIGHT
  ) {
    height = `${IMG_MAX_CANVAS_HEIGHT}px`;
  } else {
    height = `${computedImage.value.canvasHeightPx}px`;
  }
  e("height", height);
  return height;
});

const canvasWidth = computed<string>(() => {
  if (p.rules.width === "full") {
    return "100%";
  }
  if (isEditorModeEnabled.value) {
    return `${image.value?.canvasWidthPx || 500}px`;
  }
  const maxWidth = p.rules?.maxWidth || IMG_MAX_CANVAS_WIDTH;

  // if the container's width is "manual",
  // it is a percentage of the sheet's width and must be
  // recalculated based on the current sheet's width
  let containerWidth =
    (maxWidth / (image.value?.sheetWidthPx || 1)) *
    (image.value?.canvasWidthPx || 0);
  containerWidth ||=
    canvas.value?.clientWidth ||
    computedImage.value.canvasWidthPx ||
    IMG_MAX_CANVAS_WIDTH;

  if (containerWidth > maxWidth) {
    return `${maxWidth}px`;
  }
  return `${containerWidth}px`;
});

const mask = computed(() => {
  if (p.rules.mask === "bottom") {
    return {
      maskImage: `url(/images/masks/bottom-${image.value?.mask || 1}.png)`,
      maskRepeat: "repeat-x",
      maskPosition: "bottom center",
    };
  }
  if (p.rules.mask === "left") {
    return {
      maskImage: `url(/images/masks/left-${image.value?.mask || 1}.png)`,
      maskRepeat: "repeat-y",
      maskPosition: "top left",
    };
  }
  if (p.rules.mask === "bottom-right") {
    return {
      maskImage: `url(/images/masks/bottom-right-${
        image.value?.mask || 1
      }.png)`,
      maskRepeat: "no-repeat",
      maskPosition: "bottom right",
    };
  }
});

// image composables
const { startDragX } = useImageDragX(
  image,
  canvas,
  originalImageWidth,
  originalImageHeight,
  rulesRef
);
const { startDragY } = useImageDragY(
  image,
  canvas,
  originalImageWidth,
  originalImageHeight,
  p.rules
);
const { startMoveXY } = useImageMoveXY(
  image,
  canvas,
  originalImageWidth,
  originalImageHeight,
  rulesRef
);
const { startResize } = useImageResize(
  image,
  canvas,
  originalImageWidth,
  originalImageHeight,
  p.rules
);
// token composables
const { startMoveTokenXY } = useTokenMoveXY(image, token, canvas, rulesRef);
const { startTokenResize } = useTokenResize(token, canvas);

// Fix the image height and position when the screen width changes
watch(
  [width, isEditorModeEnabled, () => p.rules, () => canvas.value?.clientHeight],
  () => {
    if (isEditorModeEnabled.value) {
      fixCanvasSize(image, p.rules);
      fixImageSize(
        image.value,
        canvas.value?.clientWidth || 0,
        canvas.value?.clientHeight || 0,
        originalImageWidth.value,
        originalImageHeight.value,
        p.rules
      );
      fixImagePosition(
        image.value,
        canvas.value?.clientWidth || 0,
        canvas.value?.clientHeight || 0,
        originalImageWidth.value,
        originalImageHeight.value,
        p.rules
      );
      fixTokenSize(
        token,
        canvas.value?.clientWidth || 0,
        canvas.value?.clientHeight || 0
      );
      fixTokenPosition(
        token,
        canvas.value?.clientWidth || 0,
        canvas.value?.clientHeight || 0
      );
    }
  },
  { immediate: true }
);

onBeforeMount(() => {
  const imageElement = new Image();
  // Check the resolution once the image is loaded
  imageElement.src = `${image.value.url}`;
  imageElement.onload = () => {
    e("load");
    isImageLoading.value = false;
    originalImageHeight.value ??= imageElement.naturalHeight;
    originalImageWidth.value ??= imageElement.naturalWidth;
  };
});
</script>

<style scoped>
.image-container {
  position: relative;
  transition: margin-bottom 0.15s;
}
.computed-image {
  overflow: hidden;
  background-repeat: no-repeat;
  mask-origin: stroke-box;
  background: theme("colors.background-inset.500");
}
.image-outline {
  position: absolute;
  z-index: 100;
  inset: 0px;
  border: 2px solid;
  cursor: move;
  border-radius: 2px;
  @apply border-primary-700;
}
.token {
  position: absolute;
  z-index: 101;
  cursor: move;
  border: 2px solid;
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
.image-handle-bottom {
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
.image-handle-right {
  position: absolute;
  z-index: 100;
  top: calc(50% - 60px);
  left: calc(100% - 3px);
  width: 8px;
  height: 120px;
  cursor: ew-resize;
  border: 1px solid;
  border-radius: 2px;
  @apply bg-primary-500 border-primary-700;
}
.image-handle-bottom:hover,
.image-handle-right:hover {
  @apply bg-primary-300;
}
.image-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
.vertical-line {
  position: absolute;
  z-index: 102;
  top: 0;
  left: calc(50% - 1px);
  width: 1px;
  height: 100%;
  border-right: 1px dashed rgba(125, 125, 125, 0.7);
}
.horizontal-line {
  position: absolute;
  z-index: 102;
  top: calc(50% - 1px);
  left: 0;
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed rgba(125, 125, 125, 0.7);
}
.elevated {
  z-index: 9900;
}
.image-tools {
  position: absolute;
  z-index: 100;
  top: 0;
  right: 0;
  padding: 0.5rem;
}

@keyframes loading {
  0% {
    background-position: 400% 0;
  }
  100% {
    background-position: -400% 0;
  }
}
</style>
