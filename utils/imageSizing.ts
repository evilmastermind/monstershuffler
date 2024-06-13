import type { ImageRules, Image, Token } from "@/types";
import {
  IMG_MIN_CANVAS_HEIGHT,
  IMG_MIN_CANVAS_WIDTH,
  IMG_MAX_CANVAS_HEIGHT,
  IMG_MAX_CANVAS_WIDTH,
} from "@/utils";

/**
 * Resizes an image if it's not big enough to cover its container.
 */
export function fixImageSize(
  image: Image,
  containerWidth: number,
  containerHeight: number,
  originalImageWidth: number,
  originalImageHeight: number,
  rules: ImageRules
) {
  // check if the image is too small to cover the container
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
 * Shrinks an image when there's been an automatic layout change (e.g. mobile)
 * and the chosen image size is too big to look good on the new layout
 */
export function shrinkImage(
  image: Image,
  containerWidth: number,
  containerHeight: number,
  originalImageWidth: number,
  originalImageHeight: number,
  smAndDown = false
) {
  image.imageHeightPx ??= containerHeight;
  if (containerHeight > image.imageHeightPx && !smAndDown) {
    return;
  }
  const imageWidth = getImageWidth(
    originalImageWidth,
    image.imageHeightPx,
    originalImageHeight
  );
  const heightProportions = image.imageHeightPx / containerHeight;
  const widthProportions = imageWidth / containerWidth;

  // the axis with lower proportion is the one that we need to use
  // as the minimum size for the image
  if (heightProportions > widthProportions) {
    const newImageWidth = containerWidth;
    image.imageHeightPx =
      originalImageHeight * (newImageWidth / originalImageWidth);
  } else {
    image.imageHeightPx = containerHeight;
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
    image.value.canvasHeightPx < IMG_MIN_CANVAS_HEIGHT
  ) {
    image.value.canvasHeightPx = IMG_MIN_CANVAS_HEIGHT;
  }
  if (
    rules.width === "manual" &&
    image.value.canvasWidthPx &&
    image.value.canvasWidthPx < IMG_MIN_CANVAS_WIDTH
  ) {
    image.value.canvasWidthPx = IMG_MIN_CANVAS_WIDTH;
  }
  if (
    rules.height === "manual" &&
    image.value.canvasHeightPx &&
    image.value.canvasHeightPx > IMG_MAX_CANVAS_HEIGHT
  ) {
    image.value.canvasHeightPx = IMG_MAX_CANVAS_HEIGHT;
  }
  const maxWidth = rules.maxWidth || IMG_MAX_CANVAS_WIDTH;
  if (
    rules.width === "manual" &&
    image.value.canvasWidthPx &&
    image.value.canvasWidthPx > maxWidth
  ) {
    image.value.canvasWidthPx = maxWidth;
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
  /**
   * PHASE 1
   * Calculate the proportions of the image/token/canvas sizes set by the user
   * when the image was saved.
   */
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

  /**
   * PHASE 2
   * Calculate the new image size and position based on the current container size
   */

  const newImage = { ...image.value };
  let containerWidth = container.value.clientWidth;

  // if the container's width is "manual",
  // it is a percentage of the sheet's width and must be
  // recalculated based on the current sheet's width
  if (rules.width === "manual") {
    containerWidth =
      ((rules.maxWidth || 0) /
        (image.value?.sheetWidthPx || rules.maxWidth || IMG_MAX_CANVAS_WIDTH)) *
      (image.value?.canvasWidthPx || 0);
    containerWidth ||= container.value.clientWidth;
  }

  // find the new image height necessary to cover the new/current container size
  fixImageSize(
    newImage,
    containerWidth,
    container.value.clientHeight,
    originalImageWidth.value,
    originalImageHeight.value,
    rules
  );
  // if the container height is different than the original container's height that was
  // used to calculate the token's position, it means there's been a layout
  // change (e.g. monster sheet opened on mobile, LayoutC => LayoutA) and we
  // need to check if the image size could be reduced to make it fully visible
  if (
    (image.value.canvasHeightPx &&
      container.value.clientHeight < image.value.canvasHeightPx) ||
    smAndDown.value
  ) {
    shrinkImage(
      newImage,
      containerWidth,
      container.value.clientHeight,
      originalImageWidth.value,
      originalImageHeight.value,
      smAndDown.value
    );
  }

  // find the new tokenX and tokenCenterY for the container
  let tokenXContainer = containerWidth * containerProportionX;
  let tokenYContainer = container.value.clientHeight * containerProportionY;

  // checking if the token is out of bounds with this new container size
  if (tokenXContainer + token.value.widthPx / 2 > containerWidth) {
    if (token.value.widthPx > containerWidth) {
      tokenXContainer = containerWidth / 2;
    } else {
      tokenXContainer = containerWidth - token.value.widthPx / 2;
    }
  }
  if (
    tokenYContainer + token.value.widthPx / 2 >
    container.value.clientHeight
  ) {
    if (token.value.widthPx > container.value.clientHeight) {
      tokenYContainer = container.value.clientHeight / 2;
    } else {
      tokenYContainer = container.value.clientHeight - token.value.widthPx / 2;
    }
  }

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
    containerWidth,
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

/**
 * Calculates the width of an image based on its current height and the
 * original image's width and height.
 */
export function getImageWidth(
  originalImageWidth: number,
  imageHeight: number,
  originalImageHeight: number
) {
  return originalImageWidth * (imageHeight / originalImageHeight);
}

/**
 * Adds a token to an image in a default position.
 */
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
