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

  const startMoveTokenXY = (event: MouseEvent) => {
    event.preventDefault();
    startX = event.clientX;
    startY = event.clientY;
    containerWidth = container.value?.clientWidth || 0;
    containerHeight = container.value?.clientHeight || 0;
    startPositionLeft = token.value.leftPx;
    startPositionTop = token.value.topPx;
    fixTokenSize(token, containerWidth, containerHeight);
    document.addEventListener("mousemove", doMoveXY);
    document.addEventListener("mouseup", stopMoveXY);
  };

  const doMoveXY = (event: MouseEvent) => {
    const currentX = event.clientX;
    const currentY = event.clientY;
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
  };

  return { startMoveTokenXY };
}
