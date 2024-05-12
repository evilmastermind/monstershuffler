import type { Image, Token } from "@/types";
import { fixTokenSize, fixTokenPosition } from "@/utils";

export function useTokenMoveXY(
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

  const startMoveTokenXY = (event: MouseEvent) => {
    event.preventDefault();
    startX = event.clientX;
    startY = event.clientY;
    containerWidth = container.value?.clientWidth || 0;
    containerHeight = container.value?.clientHeight || 0;
    if (!image.value.token) {
      image.value.token = {
        leftPx: 0,
        topPx: 0,
        widthPx: 0,
      };
    }
    startPositionLeft = image.value.token.leftPx;
    startPositionTop = image.value.token.topPx;
    fixTokenSize(
      image,
      containerWidth,
      containerHeight,
      originalImageWidth,
      originalImageHeight
    );
    document.addEventListener("mousemove", doMoveXY);
    document.addEventListener("mouseup", stopMoveXY);
  };

  const doMoveXY = (event: MouseEvent) => {
    const currentX = event.clientX;
    const currentY = event.clientY;
    if (!image.value.token) {
      image.value.token = {
        leftPx: 0,
        topPx: 0,
        widthPx: 0,
      };
    }
    image.value.token.leftPx = startPositionLeft + (currentX - startX);
    image.value.token.topPx = startPositionTop + (currentY - startY);
    fixTokenPosition(
      image,
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

  return { startMoveTokenXY };
}
