import type { Token } from "@/types";
import { fixImageHeight } from "@/utils";

export function useTokenResize(
  token: Ref<Token>,
  container: Ref<HTMLElement | null>
) {
  let startX = 0;
  let startY = 0;

  const startTokenResize = (event: MouseEvent) => {
    event.preventDefault();
    startX = event.clientX;
    startY = event.clientY;
    document.addEventListener("mousemove", doResize);
    document.addEventListener("mouseup", stopResize);
  };

  const doResize = (event: MouseEvent) => {
    const currentX = event.clientX;
    const currentY = event.clientY;
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
  };

  return { startTokenResize };
}
