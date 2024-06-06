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
          background: `url(/images/backgrounds/${image.url}.webp)`,
          backgroundSize: `auto ${computedImage.imageHeightPx}px`,
          backgroundPosition: `${computedImage.imagePositionLeftPx}px ${computedImage.imagePositionTopPx}px`,
          ...mask,
        }"
      />
    </div>
    <div v-if="isEditorModeEnabled" class="my-6" />
  </div>
</template>

<script setup lang="ts">
import type { Character, Image, Token, ImageRules } from "@/types";
import {
  IMG_MAX_CANVAS_HEIGHT,
  IMG_MAX_CANVAS_WIDTH,
  fixImageHeight,
  fixImagePosition,
  calculateComputedImage,
} from "@/utils";
import { getTemporaryImage } from "@/other";

const e = defineEmits(["load"]);
const p = defineProps({
  rules: {
    type: Object as PropType<ImageRules>,
    required: true,
  },
});

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
  if (p.rules.height === "full") {
    return "100%";
  }
  if (isEditorModeEnabled.value) {
    return `${image.value?.canvasHeightPx || 500}px`;
  }
  if (
    p.rules.height === "manual" &&
    computedImage.value.canvasHeightPx &&
    computedImage.value.canvasHeightPx > IMG_MAX_CANVAS_HEIGHT
  ) {
    return `${IMG_MAX_CANVAS_HEIGHT}px`;
  }
  return `${computedImage.value.canvasHeightPx}px`;
});

const canvasWidth = computed<string>(() => {
  if (p.rules.width === "full") {
    return "100%";
  }
  if (isEditorModeEnabled.value) {
    return `${image.value?.canvasWidthPx || 500}px`;
  }
  if (
    p.rules.width === "manual" &&
    computedImage.value.canvasWidthPx &&
    computedImage.value.canvasWidthPx > IMG_MAX_CANVAS_WIDTH
  ) {
    return `${IMG_MAX_CANVAS_WIDTH}px`;
  }
  return `${computedImage.value.canvasWidthPx}px`;
});

const mask = computed(() => {
  if (p.rules.mask === "bottom") {
    return {
      maskImage: `url(/images/masks/bottom-1.png)`,
      maskRepeat: "repeat-x",
      maskPosition: "bottom center",
    };
  }
  if (p.rules.mask === "left") {
    return {
      maskImage: `url(/images/masks/left-1.png)`,
      maskRepeat: "repeat-y",
      maskPosition: "top left",
    };
  }
});

const layout = computed(() => {
  return character.value.character.user?.sheet?.layout;
});

// image composables
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
  p.rules
);
const { startResize } = useImageResize(
  image,
  canvas,
  originalImageWidth,
  originalImageHeight,
  p.rules
);
// token composables
const { startMoveTokenXY } = useTokenMoveXY(image, token, canvas);
const { startTokenResize } = useTokenResize(token, canvas);

// Fix the image height and position when the screen width changes
watch([width, isEditorModeEnabled], () => {
  if (isEditorModeEnabled.value) {
    fixImageHeight(
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
});

onBeforeMount(() => {
  const imageElement = new Image();
  // Check the resolution once the image is loaded
  imageElement.src = `/images/backgrounds/${image.value.url}.webp`;
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
  height: 100%;
}
.computed-image {
  overflow: hidden;
  background-repeat: no-repeat;
  mask-origin: stroke-box;
  @apply bg-gradient-to-t from-primary-500 to-primary-700;
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
.image-handle-bottom:hover {
  @apply bg-primary-300;
}
.image-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
</style>
