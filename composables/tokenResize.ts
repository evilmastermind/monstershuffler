import type { Token } from "@/types";
import { fixImageSize } from "@/utils";

export function useTokenResize(
  token: Ref<Token>,
  container: Ref<HTMLElement | null>
) {
  let startX = 0;
  let startY = 0;

  const startTokenResize = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    if (event instanceof TouchEvent) {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
      document.addEventListener("touchmove", doResize);
      document.addEventListener("touchend", stopResize);
    } else {
      startX = event.clientX;
      startY = event.clientY;
      document.addEventListener("mousemove", doResize);
      document.addEventListener("mouseup", stopResize);
    }
  };

  const doResize = (event: MouseEvent | TouchEvent) => {
    let currentX = 0;
    let currentY = 0;
    if (event instanceof TouchEvent) {
      currentX = event.touches[0].clientX;
      currentY = event.touches[0].clientY;
    } else {
      currentX = event.clientX;
      currentY = event.clientY;
    }
    const diffX = currentX - startX;
    const diffY = currentY - startY;
    const diff = Math.min(diffX, diffY);
    token.value.widthPx += diffX;
    startX = currentX;
    startY = currentY;
    // min width = 50px
    if (token.value.widthPx < 50) {
      token.value.widthPx = 50;
    }
    fixTokenSize(
      token,
      container.value?.clientWidth || 0,
      container.value?.clientHeight || 0
    );
    fixTokenPosition(
      token,
      container.value?.clientWidth || 0,
      container.value?.clientHeight || 0
    );
  };

  const stopResize = () => {
    document.removeEventListener("mousemove", doResize);
    document.removeEventListener("mouseup", stopResize);
    document.removeEventListener("touchmove", doResize);
    document.removeEventListener("touchend", stopResize);
  };

  return { startTokenResize };
}
