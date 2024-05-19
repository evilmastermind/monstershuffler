import type { Image } from "@/types";
import { fixImageHeight, getImageWidth } from "@/utils";

const resizeStep = 20;

export function useImageResize(
  image: Ref<Image>,
  container: Ref<HTMLElement | null>,
  originalImageWidth: number,
  originalImageHeight: number
) {
  const startResize = (event: WheelEvent | KeyboardEvent) => {
    event.preventDefault();
    if ("deltaY" in event) {
      event.deltaY < 0 ? reduceImage() : enlargeImage();
      return;
    }
    if ("key" in event) {
      switch (event.key) {
        case "+":
          enlargeImage();
          break;
        case "-":
          reduceImage();
          break;
      }
    }
  };

  function enlargeImage() {
    image.value.imageHeightPx ??= 0;
    const oldImageWidth = getImageWidth(
      originalImageWidth,
      image.value.imageHeightPx,
      originalImageHeight
    );
    image.value.imageHeightPx += resizeStep;
    image.value.imagePositionTopPx ??= 0;
    image.value.imagePositionTopPx -= resizeStep / 2;
    const newImageWidth = getImageWidth(
      originalImageWidth,
      image.value.imageHeightPx,
      originalImageHeight
    );
    image.value.imagePositionLeftPx ??= 0;
    image.value.imagePositionLeftPx -= (newImageWidth - oldImageWidth) / 2;
  }

  function reduceImage() {
    image.value.imageHeightPx ??= 0;
    const oldImageWidth =
      originalImageWidth * (image.value.imageHeightPx / originalImageHeight);
    image.value.imageHeightPx -= resizeStep;
    image.value.imagePositionTopPx ??= 0;
    image.value.imagePositionTopPx += resizeStep / 2;
    const newImageWidth =
      originalImageWidth * (image.value.imageHeightPx / originalImageHeight);
    image.value.imagePositionLeftPx ??= 0;
    image.value.imagePositionLeftPx += (oldImageWidth - newImageWidth) / 2;
    fixImageHeight(
      image.value,
      container.value?.clientWidth || 0,
      container.value?.clientHeight || 0,
      originalImageWidth,
      originalImageHeight
    );
    fixImagePosition(
      image.value,
      container.value?.clientWidth || 0,
      container.value?.clientHeight || 0,
      originalImageWidth,
      originalImageHeight
    );
  }

  return { startResize };
}
