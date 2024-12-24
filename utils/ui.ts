export function scrollIntoView(element?: Element | HTMLElement | null, options?: ScrollIntoViewOptions & { scrollIfInView?: boolean }): void {
  if (!element) {
    return;
  }
  const rect = element.getBoundingClientRect();
  if (rect.top < 0 || rect.top > window.innerHeight || options?.scrollIfInView) {
    element.scrollIntoView(options);
  }
}