import type { Image, ImageRules } from "@/types";
import { fixImageSize, getImageWidth } from "@/utils";

const resizeStep = 20;

export function useImageResize(
  image: Ref<Image>,
  container: Ref<HTMLElement | null>,
  originalImageWidth: Ref<number>,
  originalImageHeight: Ref<number>,
  rules: ImageRules
) {
  const startResize = (event: WheelEvent | KeyboardEvent) => {
    event.preventDefault();
    if ("deltaY" in event) {
      event.deltaY > 0 ? reduceImage() : enlargeImage();
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
      originalImageWidth.value,
      image.value.imageHeightPx,
      originalImageHeight.value
    );
    image.value.imageHeightPx += resizeStep;
    image.value.imagePositionTopPx ??= 0;
    image.value.imagePositionTopPx -= resizeStep / 2;
    const newImageWidth = getImageWidth(
      originalImageWidth.value,
      image.value.imageHeightPx,
      originalImageHeight.value
    );
    image.value.imagePositionLeftPx ??= 0;
    image.value.imagePositionLeftPx -= (newImageWidth - oldImageWidth) / 2;
  }

  function reduceImage() {
    image.value.imageHeightPx ??= 0;
    const oldImageWidth =
      originalImageWidth.value *
      (image.value.imageHeightPx / originalImageHeight.value);
    image.value.imageHeightPx -= resizeStep;
    image.value.imagePositionTopPx ??= 0;
    image.value.imagePositionTopPx += resizeStep / 2;
    const newImageWidth =
      originalImageWidth.value *
      (image.value.imageHeightPx / originalImageHeight.value);
    image.value.imagePositionLeftPx ??= 0;
    image.value.imagePositionLeftPx += (oldImageWidth - newImageWidth) / 2;
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
  }

  return { startResize };
}
