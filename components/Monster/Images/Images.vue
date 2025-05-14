<template>
  <div
    ref="container"
    :class="[
      'relative transition-[margin-bottom]_duration-150',
      isImageEditorOpen ? 'mb-6 z-[9900]' : '',
    ]"
  >
    <div
      v-if="isImageEditorOpen"
      class="absolute inset-0 border-2 rounded cursor-move border-primary z-100"
      @mousedown="startMoveXY"
      @touchstart.stop="startMoveXY"
      @wheel="startResize"
      @keyup.-="startResize"
      @keyup.+="startResize"
    >
      <MonsterImagesTools
        :image
        class="absolute top-1 right-1 w-min z-110"
        @enlarge="enlargeImage"
        @reduce="reduceImage"
      />

      <div
        v-if="rules.width !== 'full'"
        class="absolute top-1/2 -translate-y-1/2 -right-[3px] w-2 h-[120px] cursor-ew-resize bg-primary border border-primary rounded-sm z-100"
        @mousedown.stop="startDragX"
        @touchstart.stop="startDragX"
      />
      <div
        v-if="rules.height !== 'full'"
        class="absolute left-1/2 -translate-x-1/2 top-[calc(100%-3px)] w-[120px] h-2 cursor-ns-resize bg-primary-500 border border-primary rounded-sm z-100"
        @mousedown.stop="startDragY"
        @touchstart.stop="startDragY"
      />

      <div
        v-if="isImageEditorOpen"
        class="absolute"
        :style="{
          top: `${token.topPx}px`,
          left: `${token.leftPx}px`,
          width: `${token.widthPx}px`,
          height: `${token.widthPx}px`,
        }"
        @mousedown.stop="startMoveTokenXY"
        @touchstart.stop="startMoveTokenXY"
      >
        <div
          class="relative w-full h-full rounded-full border-2 border-primary shadow-[0_0_40px_2px_rgba(0,0,0,1)] cursor-move z-101"
        >
          <div
            class="absolute bottom-[-3px] right-[-3px] w-[6px] h-[20px] bg-primary-500 border border-primary rounded-sm cursor-se-resize z-102"
            @mousedown.stop="startTokenResize"
            @touchstart.stop="startTokenResize"
          />
          <div
            class="absolute bottom-[-3px] right-[-3px] w-[20px] h-[6px] bg-primary-500 border border-primary rounded-sm cursor-se-resize z-102"
            @mousedown.stop="startTokenResize"
            @touchstart.stop="startTokenResize"
          />
          <div
            class="absolute bottom-[-2px] right-[-2px] w-[4px] h-[15px] bg-primary-500 z-102"
            @mousedown.stop="startTokenResize"
            @touchstart.stop="startTokenResize"
          />
        </div>
      </div>
    </div>

    <div
      ref="canvas"
      class="bg-accented overflow-hidden bg-no-repeat mask-origin-stroke-box"
      :style="{
        width: canvasWidth,
        height: canvasHeight,
        backgroundImage: `url(${image.url})`,
        backgroundSize: `auto ${computedImage.imageHeightPx}px`,
        backgroundPosition: `${computedImage.imagePositionLeftPx}px ${computedImage.imagePositionTopPx}px`,
        backgroundColor: isImageLoading ? 'initial' : 'transparent',
        ...mask,
      }"
    >
      <div
        v-if="isImageEditorOpen"
        class="absolute inset-y-1/2 left-1/2 -translate-x-1 border-r border-dashed border-[rgba(125,125,125,0.7)] z-102"
      />
      <div
        v-if="isImageEditorOpen"
        class="absolute inset-x-0 top-1/2 -translate-y-1 border-b border-dashed border-[rgba(125,125,125,0.7)] z-102"
      />
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
const container = ref<HTMLElement | null>(null);

const character = inject("character") as Ref<Character>;
const { isImageEditorOpen } = storeToRefs(editor);
const originalImageWidth = ref();
const originalImageHeight = ref();

const image = ref<Image>(getTemporaryImage(character.value, canvas));
const token = ref<Token>(image.value.token || createToken(image, canvas));
const isImageLoading = ref(true);

const computedImage = computed<Image>(() => {
  if (isImageEditorOpen.value || canvas.value === null) {
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
    p.rules,
  );
});

const canvasHeight = computed<string>(() => {
  let height = "0px";
  if (p.rules.height === "full") {
    height = "100%";
  } else if (isImageEditorOpen.value) {
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
  if (isImageEditorOpen.value) {
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
  if (image.value?.mask === undefined || !image.value?.mask) {
    return {};
  }
  if (p.rules.mask === "bottom") {
    return {
      maskImage: `url(/images/masks/bottom-${image.value?.mask || 1}.webp)`,
      maskRepeat: "repeat-x",
      maskPosition: "bottom center",
    };
  }
  if (p.rules.mask === "left") {
    return {
      maskImage: `url(/images/masks/left-${image.value?.mask || 1}.webp)`,
      maskRepeat: "repeat-y",
      maskPosition: "top left",
    };
  }
  if (p.rules.mask === "bottom-right") {
    return {
      maskImage: `url(/images/masks/bottom-right-${
        image.value?.mask || 1
      }.webp)`,
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
  rulesRef,
);
const { startDragY } = useImageDragY(
  image,
  canvas,
  originalImageWidth,
  originalImageHeight,
  p.rules,
);
const { startMoveXY } = useImageMoveXY(
  image,
  canvas,
  originalImageWidth,
  originalImageHeight,
  rulesRef,
);
const { startResize, enlargeImage, reduceImage } = useImageResize(
  image,
  canvas,
  originalImageWidth,
  originalImageHeight,
  p.rules,
);
// token composables
const { startMoveTokenXY } = useTokenMoveXY(image, token, canvas, rulesRef);
const { startTokenResize } = useTokenResize(token, canvas);

function enableDropImage(element: HTMLElement | null) {
  if (!element) {
    return;
  }
  element.addEventListener(
    "dragover",
    (event) => fileDragHover(event, element),
    false,
  );
  element.addEventListener(
    "dragleave",
    (event) => fileDragHover(event, element),
    false,
  );
  element.addEventListener(
    "drop",
    (event) => fileSelectHandler(event, element),
    false,
  );
}

function fileDragHover(e: DragEvent, element: HTMLElement) {
  e.stopPropagation();
  e.preventDefault();
  // TODO: add hover effect
  element.classList.toggle("drag-border", e.type === "dragover");
}

function fileSelectHandler(e: DragEvent, element: HTMLElement) {
  // Fetch FileList object
  const files = e?.dataTransfer?.files;

  // Cancel event and hover styling
  fileDragHover(e, element);

  if (!files) {
    return;
  }

  // Process all File objects
  for (let i = 0, f; (f = files[i]); i++) {
    if (f) {
      // check if file is an image
      if (!f.type.match("image.*")) {
        continue;
      }
      const objectURL = URL.createObjectURL(f);
      image.value.url = objectURL;
    }
  }
}

function checkImageSize() {
  const imageElement = new Image();
  // Check the resolution once the image is loaded
  imageElement.src = `${image.value.url}`;
  // check if the image exists
  imageElement.onerror = () => {
    e("load");
    isImageLoading.value = false;
    image.value.url = "/images/backgrounds/default.webp";
  };
  imageElement.onload = () => {
    e("load");
    isImageLoading.value = false;
    originalImageHeight.value = imageElement.naturalHeight;
    originalImageWidth.value = imageElement.naturalWidth;
  };
}

// Fix the image height and position when the screen width changes
watch(
  [
    width,
    isImageEditorOpen,
    () => p.rules,
    () => canvas.value?.clientHeight,
    originalImageHeight,
    originalImageWidth,
  ],
  () => {
    if (isImageEditorOpen.value) {
      fixCanvasSize(image, p.rules);
      fixImageSize(
        image.value,
        canvas.value?.clientWidth || 0,
        canvas.value?.clientHeight || 0,
        originalImageWidth.value,
        originalImageHeight.value,
        p.rules,
      );
      fixImagePosition(
        image.value,
        canvas.value?.clientWidth || 0,
        canvas.value?.clientHeight || 0,
        originalImageWidth.value,
        originalImageHeight.value,
        p.rules,
      );
      fixTokenSize(
        token,
        canvas.value?.clientWidth || 0,
        canvas.value?.clientHeight || 0,
      );
      fixTokenPosition(
        token,
        canvas.value?.clientWidth || 0,
        canvas.value?.clientHeight || 0,
      );
    }
  },
  { immediate: true },
);

watch(
  () => image.value.url,
  () => {
    isImageLoading.value = true;
    checkImageSize();
  },
);

onMounted(() => {
  enableDropImage(container.value);
});

onBeforeMount(() => {
  checkImageSize();
});
</script>

<style scoped>
@keyframes drag {
  0% {
    box-shadow: inset 0 0 2px 2px var(--ui-primary);
  }
  50% {
    box-shadow: inset 0 0 0px 0px var(--ui-primary);
  }
  100% {
    box-shadow: inset 0 0 2px 2px var(--ui-primary);
  }
}
</style>
