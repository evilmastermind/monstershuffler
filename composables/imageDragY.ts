import type { Image, ImageRules } from "@/types";
import { fixImageSize, fixCanvasSize } from "@/utils";

export function useImageDragY(
  image: Ref<Image>,
  container: Ref<HTMLElement | null>,
  originalImageWidth: Ref<number>,
  originalImageHeight: Ref<number>,
  rules: ImageRules
) {
  let startY = 0;
  let startHeight = 0;

  const startDragY = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    startHeight = image.value.canvasHeightPx || 500;
    if (event instanceof TouchEvent) {
      startY = event.touches[0].clientY;
      document.addEventListener("touchmove", doDragY);
      document.addEventListener("touchend", stopDragY);
    } else {
      startY = event.clientY;
      document.addEventListener("mousemove", doDragY);
      document.addEventListener("mouseup", stopDragY);
    }
  };

  const doDragY = (event: MouseEvent | TouchEvent) => {
    let currentY = 0;
    if (event instanceof TouchEvent) {
      currentY = event.touches[0].clientY;
    } else {
      currentY = event.clientY;
    }

    image.value.canvasHeightPx = startHeight + (currentY - startY);

    fixCanvasSize(image, rules);

    fixImageSize(
      image.value,
      container.value?.clientWidth || 0,
      container.value?.clientHeight || 0,
      originalImageWidth.value,
      originalImageHeight.value,
      rules
    );
    fixImagePosition(
      image.value,
      container.value?.clientWidth || 0,
      container.value?.clientHeight || 0,
      originalImageWidth.value,
      originalImageHeight.value,
      rules
    );
    if ("token" in image.value && image.value.token) {
      fixTokenPosition(
        ref(image.value.token),
        container.value?.clientWidth || 0,
        container.value?.clientHeight || 0
      );
      fixTokenSize(
        ref(image.value.token),
        container.value?.clientWidth || 0,
        container.value?.clientHeight || 0
      );
    }
  };

  const stopDragY = () => {
    document.removeEventListener("mousemove", doDragY);
    document.removeEventListener("mouseup", stopDragY);
    document.removeEventListener("touchmove", doDragY);
    document.removeEventListener("touchend", stopDragY);
  };

  return { startDragY };
}
