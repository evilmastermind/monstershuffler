import type { Image } from "@/types";
import { fixImageHeight, fixImagePosition } from "@/utils";

export function useImageMoveXY(
  image: Ref<Image>,
  container: Ref<HTMLElement | null>,
  originalImageWidth: number,
  originalImageHeight: number
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
      originalImageWidth,
      originalImageHeight
    );
    imageHeight = image.value.imageHeightPx || originalImageHeight;
    imageWidth = originalImageWidth * (imageHeight / originalImageHeight);
    document.addEventListener("mousemove", doMoveXY);
    document.addEventListener("mouseup", stopMoveXY);
  };

  const doMoveXY = (event: MouseEvent) => {
    const currentX = event.clientX;
    const currentY = event.clientY;
    image.value.imagePositionLeftPx = startPositionLeft + (currentX - startX);
    image.value.imagePositionTopPx = startPositionTop + (currentY - startY);
    fixImagePosition(
      image.value,
      containerWidth,
      containerHeight,
      originalImageWidth,
      originalImageHeight
    );
  };

  const stopMoveXY = () => {
    document.removeEventListener("mousemove", doMoveXY);
    document.removeEventListener("mouseup", stopMoveXY);
  };

  return { startMoveXY };
}
