import type { Image } from "@/types";

export function fixImageHeight(
  image: Ref<Image>,
  containerWidth: number,
  containerHeight: number,
  originalImageWidth: number,
  originalImageHeight: number
) {
  image.value.imageHeightPx ??= originalImageHeight;
  if (image.value.imageHeightPx < containerHeight) {
    image.value.imageHeightPx = containerHeight;
  }
  const imageWidth =
    originalImageWidth * (image.value.imageHeightPx / originalImageHeight);
  if (imageWidth < containerWidth) {
    image.value.imageHeightPx =
      originalImageHeight * (containerWidth / originalImageWidth);
  }
}

export function fixImagePosition(
  image: Ref<Image>,
  containerWidth: number,
  containerHeight: number,
  originalImageWidth: number,
  originalImageHeight: number
) {
  image.value.imageHeightPx ??= originalImageHeight;
  image.value.imagePositionLeftPx ??= 0;
  image.value.imagePositionTopPx ??= 0;
  const imageWidth = getImageWidth(
    originalImageWidth,
    image.value.imageHeightPx,
    originalImageHeight
  );
  // image doesn't cover the container on the left or top
  if (image.value.imagePositionLeftPx > 0) {
    image.value.imagePositionLeftPx = 0;
  }
  if (image.value.imagePositionTopPx > 0) {
    image.value.imagePositionTopPx = 0;
  }
  // image doesn't cover the container on the right or bottom
  if (image.value.imagePositionLeftPx + imageWidth < containerWidth) {
    image.value.imagePositionLeftPx = containerWidth - imageWidth;
  }
  if (
    image.value.imagePositionTopPx + image.value.imageHeightPx <
    containerHeight
  ) {
    image.value.imagePositionTopPx =
      containerHeight - image.value.imageHeightPx;
  }
}

export function fixTokenSize(
  image: Ref<Image>,
  containerWidth: number,
  containerHeight: number,
  originalImageWidth: number,
  originalImageHeight: number
) {
  if (!image.value.token) {
    image.value.token = {
      leftPx: 0,
      topPx: 0,
      widthPx: 0,
    };
  }
  if (image.value.token.widthPx + image.value.token.leftPx > containerWidth) {
    image.value.token.widthPx = containerWidth - image.value.token.leftPx;
  }
  if (image.value.token.widthPx + image.value.token.topPx > containerHeight) {
    image.value.token.widthPx = containerHeight - image.value.token.topPx;
  }
}

export function fixTokenPosition(
  image: Ref<Image>,
  containerWidth: number,
  containerHeight: number,
  originalImageWidth: number,
  originalImageHeight: number
) {
  if (!image.value.token) {
    image.value.token = {
      leftPx: 0,
      topPx: 0,
      widthPx: 0,
    };
  }
  if (image.value.token.widthPx + image.value.token.leftPx > containerWidth) {
    image.value.token.leftPx = containerWidth - image.value.token.widthPx;
  }
  if (image.value.token.widthPx + image.value.token.topPx > containerHeight) {
    image.value.token.topPx = containerHeight - image.value.token.widthPx;
  }
}

export function getImageWidth(
  originalImageWidth: number,
  imageHeight: number,
  originalImageHeight: number
) {
  return originalImageWidth * (imageHeight / originalImageHeight);
}
