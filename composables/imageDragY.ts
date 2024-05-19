import type { Image } from "@/types";
import { fixImageHeight } from "@/utils";

export function useImageDragY(
  image: Ref<Image>,
  container: Ref<HTMLElement | null>,
  originalImageWidth: Ref<number>,
  originalImageHeight: Ref<number>
) {
  let startY = 0;
  let startHeight = 0;

  const startDragY = (event: MouseEvent) => {
    event.preventDefault();
    startY = event.clientY;
    startHeight = image.value.canvasHeightPx || 500;
    document.addEventListener("mousemove", doDragY);
    document.addEventListener("mouseup", stopDragY);
  };

  const doDragY = (event: MouseEvent) => {
    const currentY = event.clientY;
    image.value.canvasHeightPx = startHeight + (currentY - startY);
    fixImageHeight(
      image.value,
      container.value?.clientWidth || 0,
      container.value?.clientHeight || 0,
      originalImageWidth.value,
      originalImageHeight.value
    );
    fixImagePosition(
      image.value,
      container.value?.clientWidth || 0,
      container.value?.clientHeight || 0,
      originalImageWidth.value,
      originalImageHeight.value
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
  };

  return { startDragY };
}
