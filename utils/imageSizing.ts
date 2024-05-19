import type { Image, Token } from "@/types";

export function fixImageHeight(
  image: Image,
  containerWidth: number,
  containerHeight: number,
  originalImageWidth: number,
  originalImageHeight: number
) {
  image.imageHeightPx ??= originalImageHeight;
  if (image.imageHeightPx < containerHeight) {
    image.imageHeightPx = containerHeight;
  }
  const imageWidth = getImageWidth(
    originalImageWidth,
    image.imageHeightPx,
    originalImageHeight
  );
  if (imageWidth < containerWidth) {
    image.imageHeightPx =
      originalImageHeight * (containerWidth / originalImageWidth);
  }
}

export function fixImagePosition(
  image: Image,
  containerWidth: number,
  containerHeight: number,
  originalImageWidth: number,
  originalImageHeight: number
) {
  image.canvasWidthPx = containerWidth;
  image.imageHeightPx ??= originalImageHeight;
  image.imagePositionLeftPx ??= 0;
  image.imagePositionTopPx ??= 0;
  const imageWidth = getImageWidth(
    originalImageWidth,
    image.imageHeightPx,
    originalImageHeight
  );
  // image doesn't cover the container on the left or top
  if (image.imagePositionLeftPx > 0) {
    image.imagePositionLeftPx = 0;
  }
  if (image.imagePositionTopPx > 0) {
    image.imagePositionTopPx = 0;
  }
  // image doesn't cover the container on the right or bottom
  if (image.imagePositionLeftPx + imageWidth < containerWidth) {
    image.imagePositionLeftPx = containerWidth - imageWidth;
  }
  if (image.imagePositionTopPx + image.imageHeightPx < containerHeight) {
    image.imagePositionTopPx = containerHeight - image.imageHeightPx;
  }
}

export function fixTokenSize(
  token: Ref<Token>,
  containerWidth: number,
  containerHeight: number
) {
  // token goes out of bounds (right or bottom)
  if (token.value.widthPx + token.value.leftPx > containerWidth) {
    token.value.widthPx = containerWidth - token.value.leftPx;
  }
  if (token.value.widthPx + token.value.topPx > containerHeight) {
    token.value.widthPx = containerHeight - token.value.topPx;
  }
  // token can't be bigger than the container's width or height
  if (token.value.widthPx > containerWidth) {
    token.value.widthPx = containerWidth;
  }
  if (token.value.widthPx > containerHeight) {
    token.value.widthPx = containerHeight;
  }
  // min width = 50px
  if (token.value.widthPx < 50) {
    token.value.widthPx = 50;
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
