import type { Image, ImageRules } from "@/types";
import { fixImageSize, fixImagePosition, IMG_MAX_CANVAS_WIDTH } from "@/utils";

export function useImageMoveXY(
  image: Ref<Image>,
  container: Ref<HTMLElement | null>,
  originalImageWidth: Ref<number>,
  originalImageHeight: Ref<number>,
  rules: Ref<ImageRules>
) {
  let startX = 0;
  let startY = 0;
  let startPositionLeft = 0;
  let startPositionTop = 0;
  let containerWidth = 0;
  let containerHeight = 0;
  let imageWidth = 0;
  let imageHeight = 0;

  const startMoveXY = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    if (event instanceof TouchEvent) {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    } else {
      startX = event.clientX;
      startY = event.clientY;
    }
    containerWidth = container.value?.clientWidth || 0;
    containerHeight = container.value?.clientHeight || 0;
    startPositionLeft = image.value.imagePositionLeftPx || 0;
    startPositionTop = image.value.imagePositionTopPx || 0;
    fixImageSize(
      image.value,
      containerWidth,
      containerHeight,
      originalImageWidth.value,
      originalImageHeight.value,
      rules.value
    );
    imageHeight = image.value.imageHeightPx || originalImageHeight.value;
    imageWidth =
      originalImageWidth.value * (imageHeight / originalImageHeight.value);

    if (event instanceof TouchEvent) {
      document.addEventListener("touchmove", doMoveXY);
      document.addEventListener("touchend", stopMoveXY);
    } else {
      document.addEventListener("mousemove", doMoveXY);
      document.addEventListener("mouseup", stopMoveXY);
    }
  };

  const doMoveXY = (event: MouseEvent | TouchEvent) => {
    let currentX = 0;
    let currentY = 0;
    if (event instanceof TouchEvent) {
      currentX = event.touches[0].clientX;
      currentY = event.touches[0].clientY;
    } else {
      currentX = event.clientX;
      currentY = event.clientY;
    }
    image.value.imagePositionLeftPx = startPositionLeft + (currentX - startX);
    image.value.imagePositionTopPx = startPositionTop + (currentY - startY);
    image.value.canvasWidthPx = containerWidth;
    image.value.canvasHeightPx = containerHeight;
    image.value.sheetWidthPx = rules.value.maxWidth || IMG_MAX_CANVAS_WIDTH;
    fixImagePosition(
      image.value,
      containerWidth,
      containerHeight,
      originalImageWidth.value,
      originalImageHeight.value,
      rules.value
    );
  };

  const stopMoveXY = () => {
    document.removeEventListener("mousemove", doMoveXY);
    document.removeEventListener("mouseup", stopMoveXY);
    document.removeEventListener("touchmove", doMoveXY);
    document.removeEventListener("touchend", stopMoveXY);
  };

  return { startMoveXY };
}
