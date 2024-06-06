import type { Image, ImageRules } from "@/types";
import { fixImageHeight, fixImagePosition } from "@/utils";

export function useImageMoveXY(
  image: Ref<Image>,
  container: Ref<HTMLElement | null>,
  originalImageWidth: Ref<number>,
  originalImageHeight: Ref<number>,
  rules: ImageRules
) {
  let startX = 0;
  let startY = 0;
  let startPositionLeft = 0;
  let startPositionTop = 0;
  let containerWidth = 0;
  let containerHeight = 0;
  let imageWidth = 0;
  let imageHeight = 0;

  const startMoveXY = (event: MouseEvent) => {
    event.preventDefault();
    startX = event.clientX;
    startY = event.clientY;
    containerWidth = container.value?.clientWidth || 0;
    containerHeight = container.value?.clientHeight || 0;
    startPositionLeft = image.value.imagePositionLeftPx || 0;
    startPositionTop = image.value.imagePositionTopPx || 0;
    fixImageHeight(
      image.value,
      containerWidth,
      containerHeight,
      originalImageWidth.value,
      originalImageHeight.value,
      rules
    );
    imageHeight = image.value.imageHeightPx || originalImageHeight.value;
    imageWidth =
      originalImageWidth.value * (imageHeight / originalImageHeight.value);
    document.addEventListener("mousemove", doMoveXY);
    document.addEventListener("mouseup", stopMoveXY);
  };

  const doMoveXY = (event: MouseEvent) => {
    const currentX = event.clientX;
    const currentY = event.clientY;
    image.value.imagePositionLeftPx = startPositionLeft + (currentX - startX);
    image.value.imagePositionTopPx = startPositionTop + (currentY - startY);
    image.value.canvasWidthPx = containerWidth;
    image.value.canvasHeightPx = containerHeight;
    fixImagePosition(
      image.value,
      containerWidth,
      containerHeight,
      originalImageWidth.value,
      originalImageHeight.value,
      rules
    );
  };

  const stopMoveXY = () => {
    document.removeEventListener("mousemove", doMoveXY);
    document.removeEventListener("mouseup", stopMoveXY);
  };

  return { startMoveXY };
}
