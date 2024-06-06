import type { ImageRules, Image, Token } from "@/types";
import { IMG_MAX_CANVAS_HEIGHT, IMG_MAX_CANVAS_WIDTH } from "@/utils";

/**
 * Resizes an image if it's not big enough to cover its container.
 */
export function fixImageHeight(
  image: Image,
  containerWidth: number,
  containerHeight: number,
  originalImageWidth: number,
  originalImageHeight: number,
  rules: ImageRules
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
/**
 * Moves an image relative to its container in order to cover it.
 */
export function fixImagePosition(
  image: Image,
  containerWidth: number,
  containerHeight: number,
  originalImageWidth: number,
  originalImageHeight: number,
  rules: ImageRules
) {
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

/**
 * Resizes a token if it's too big to fit into the image's container
 */
export function fixTokenSize(
  token: Ref<Token>,
  containerWidth: number,
  containerHeight: number
) {
  // // token goes out of bounds (right or bottom)
  // if (token.value.widthPx + token.value.leftPx > containerWidth) {
  //   token.value.widthPx = containerWidth - token.value.leftPx;
  // }
  // if (token.value.widthPx + token.value.topPx > containerHeight) {
  //   token.value.widthPx = containerHeight - token.value.topPx;
  // }
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
/**
 * Changes a token's position when it goes outside the container's borders
 */
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

export function fixCanvasSize(image: Ref<Image>, rules: ImageRules) {
  if (
    rules.height === "manual" &&
    image.value.canvasHeightPx &&
    image.value.canvasHeightPx > IMG_MAX_CANVAS_HEIGHT
  ) {
    image.value.canvasHeightPx = IMG_MAX_CANVAS_HEIGHT;
  }
  if (
    rules.width === "manual" &&
    image.value.canvasWidthPx &&
    image.value.canvasWidthPx > IMG_MAX_CANVAS_WIDTH
  ) {
    image.value.canvasWidthPx = IMG_MAX_CANVAS_WIDTH;
  }
}

/**
 * This function recalculates the image position when the screen width
 * changes. It tries to make the part of the image where the token is placed
 * visible at all times.
 */
export function calculateComputedImage(
  image: Ref<Image>,
  token: Ref<Token>,
  container: Ref<HTMLElement>,
  smAndDown: Ref<boolean>,
  originalImageWidth: Ref<number>,
  originalImageHeight: Ref<number>,
  width: number, // this is used to trigger computedImage's recalculation
  rules: ImageRules
): Image {
  // find the proportions of the token's position relative to the saved canvas size
  const tokenXCanvas = token.value.leftPx + token.value.widthPx / 2;
  const tokenYCanvas = token.value.topPx + token.value.widthPx / 2;
  const containerProportionX =
    tokenXCanvas / (image.value.canvasWidthPx || container.value.clientWidth);
  const containerProportionY =
    tokenYCanvas / (image.value.canvasHeightPx || container.value.clientHeight);

  // find the image width
  const imageWidth = getImageWidth(
    originalImageWidth.value,
    image.value.imageHeightPx || originalImageWidth.value,
    originalImageHeight.value
  );

  // find the proportions of the token's position relative to the saved image size
  const imageProportionX =
    (tokenXCanvas - (image.value.imagePositionLeftPx || 0)) / (imageWidth || 1);
  const imageProportionY =
    (tokenYCanvas - (image.value.imagePositionTopPx || 0)) /
    (image.value.imageHeightPx || 1);

  const newImage = { ...image.value };

  // find the new image height necessary to cover the new/current container size
  fixImageHeight(
    newImage,
    container.value.clientWidth,
    container.value.clientHeight,
    originalImageWidth.value,
    originalImageHeight.value,
    rules
  );

  // find the new tokenX and tokenCenterY for the container
  const tokenXContainer = container.value.clientWidth * containerProportionX;
  const tokenYContainer = container.value.clientHeight * containerProportionY;

  // find the new image width
  const newImageWidth = getImageWidth(
    originalImageWidth.value,
    newImage.imageHeightPx || originalImageWidth.value,
    originalImageHeight.value
  );

  // find the new tokenX and tokenY for the image
  const newTokenCenterXImage = newImageWidth * imageProportionX;
  const newTokenCenterYImage = (newImage.imageHeightPx || 0) * imageProportionY;

  newImage.imagePositionLeftPx = tokenXContainer - newTokenCenterXImage;
  newImage.imagePositionTopPx = tokenYContainer - newTokenCenterYImage;

  fixImagePosition(
    newImage,
    container.value.clientWidth,
    container.value.clientHeight,
    originalImageWidth.value,
    originalImageHeight.value,
    rules
  );

  return newImage;
}

/// //////////////////////////////////////////
// Utility functions
/// //////////////////////////////////////////

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
