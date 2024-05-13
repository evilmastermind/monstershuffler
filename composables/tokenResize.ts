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
    const diff = Math.max(diffX, diffY);
    token.value.widthPx += diff;
    fixTokenPosition(
      token,
      container.value?.clientWidth || 0,
      container.value?.clientHeight || 0
    );
    fixTokenSize(
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
