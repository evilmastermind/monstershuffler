import type { Image, ImageRules } from "@/types";
import { fixImageSize, fixCanvasSize, IMG_MAX_CANVAS_WIDTH } from "@/utils";

export function useImageDragX(
  image: Ref<Image>,
  container: Ref<HTMLElement | null>,
  originalImageWidth: Ref<number>,
  originalImageHeight: Ref<number>,
  rules: Ref<ImageRules>
) {
  let startX = 0;
  let startWidth = 0;

  const startDragX = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    startWidth = image.value.canvasWidthPx || 500;

    if (event instanceof TouchEvent) {
      startX = event.touches[0].clientX;
      document.addEventListener("touchmove", doDragX);
      document.addEventListener("touchend", stopDragX);
    } else {
      startX = event.clientX;
      document.addEventListener("mousemove", doDragX);
      document.addEventListener("mouseup", stopDragX);
    }
  };

  const doDragX = (event: MouseEvent | TouchEvent) => {
    let currentX = 0;

    if (event instanceof TouchEvent) {
      currentX = event.touches[0].clientX;
    } else {
      currentX = event.clientX;
    }
    
    image.value.canvasWidthPx = startWidth + (currentX - startX);
    image.value.sheetWidthPx = rules?.value?.maxWidth || IMG_MAX_CANVAS_WIDTH;
    fixCanvasSize(image, rules.value);

    fixImageSize(
      image.value,
      container.value?.clientWidth || 0,
      container.value?.clientHeight || 0,
      originalImageWidth.value,
      originalImageHeight.value,
      rules.value
    );
    fixImagePosition(
      image.value,
      container.value?.clientWidth || 0,
      container.value?.clientHeight || 0,
      originalImageWidth.value,
      originalImageHeight.value,
      rules.value
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

  const stopDragX = () => {
    document.removeEventListener("mousemove", doDragX);
    document.removeEventListener("mouseup", stopDragX);
    document.removeEventListener("touchmove", doDragX);
    document.removeEventListener("touchend", stopDragX);
  };

  return { startDragX };
}
