import type { Image, ImageRules, Token } from "@/types";
import { fixTokenSize, fixTokenPosition } from "@/utils";

export function useTokenMoveXY(
  image: Ref<Image>,
  token: Ref<Token>,
  container: Ref<HTMLElement | null>,
  rules: Ref<ImageRules>
) {
  let startX = 0;
  let startY = 0;
  let startPositionLeft = 0;
  let startPositionTop = 0;
  let containerWidth = 0;
  let containerHeight = 0;

  const startMoveTokenXY = (event: MouseEvent | TouchEvent) => {
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
    startPositionLeft = token.value.leftPx;
    startPositionTop = token.value.topPx;
    fixTokenSize(token, containerWidth, containerHeight);
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
    token.value.leftPx = startPositionLeft + (currentX - startX);
    token.value.topPx = startPositionTop + (currentY - startY);
    fixTokenPosition(token, containerWidth, containerHeight);
    image.value.canvasWidthPx = containerWidth;
    image.value.canvasHeightPx = containerHeight;
    image.value.sheetWidthPx = rules.value.maxWidth || IMG_MAX_CANVAS_WIDTH;
  };

  const stopMoveXY = () => {
    document.removeEventListener("mousemove", doMoveXY);
    document.removeEventListener("mouseup", stopMoveXY);
    document.removeEventListener("touchmove", doMoveXY);
    document.removeEventListener("touchend", stopMoveXY);
  };

  return { startMoveTokenXY };
}
