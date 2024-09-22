export function usePositioning() {
  function isHTMLElementOutOfView(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= window.innerHeight ||
      rect.bottom <= 0 ||
      rect.left >= window.innerWidth ||
      rect.right <= 0
    );
  }

  function isHTMLElementOutOfXView(element: HTMLElement | null) {
    if (!element) {
      return true;
    }
    const rect = element.getBoundingClientRect();
    console.log(rect);
    return rect.left >= window.innerWidth || rect.right < 0;
  }
  function moveElementIntoXView(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    if (rect.left < 0) {
      element.style.left = "0px";
    } else if (rect.right > window.innerWidth) {
      element.style.left = `${window.innerWidth - rect.width}px`;
    }
  }
  function isHTMLElementOutOfYView(element: HTMLElement | null) {
    if (!element) {
      return true;
    }
    const rect = element.getBoundingClientRect();
    return rect.top >= window.innerHeight || rect.bottom < 0;
  }
  function moveElementIntoYView(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    if (rect.top < 0) {
      element.style.top = "0px";
    } else if (rect.bottom > window.innerHeight) {
      element.style.top = `${window.innerHeight - rect.height}px`;
    }
  }

  return {
    isHTMLElementOutOfView,
    isHTMLElementOutOfXView,
    isHTMLElementOutOfYView,
    moveElementIntoXView,
    moveElementIntoYView,
  };
}
