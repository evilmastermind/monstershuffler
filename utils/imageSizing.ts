import type { Image, Token } from "@/types";

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
  token: Ref<Token>,
  containerWidth: number,
  containerHeight: number
) {
  if (token.value.widthPx + token.value.leftPx > containerWidth) {
    token.value.widthPx = containerWidth - token.value.leftPx;
  }
  if (token.value.widthPx + token.value.topPx > containerHeight) {
    token.value.widthPx = containerHeight - token.value.topPx;
  }
}

export function fixTokenPosition(
  token: Ref<Token>,
  containerWidth: number,
  containerHeight: number
) {
  if (token.value.leftPx < 0) {
    token.value.leftPx = 0;
  }
  if (token.value.topPx < 0) {
    token.value.topPx = 0;
  }
  if (token.value.widthPx + token.value.leftPx > containerWidth) {
    token.value.leftPx = containerWidth - token.value.widthPx;
  }
  if (token.value.widthPx + token.value.topPx > containerHeight) {
    token.value.topPx = containerHeight - token.value.widthPx;
  }
}

export function getImageWidth(
  originalImageWidth: number,
  imageHeight: number,
  originalImageHeight: number
) {
  return originalImageWidth * (imageHeight / originalImageHeight);
}

export function createToken(
  image: Ref<Image>,
  container: Ref<HTMLElement | null>
) {
  const containerWidth = container.value?.clientWidth || 0;
  const containerHeight = container.value?.clientHeight || 0;
  const tokenWidth = 100;
  const token: Token = {
    widthPx: tokenWidth,
    topPx: containerHeight / 2 - tokenWidth / 2,
    leftPx: containerWidth / 2 - tokenWidth / 2,
  };
  image.value.token = token;
  return image.value.token;
}
