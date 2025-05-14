import * as htmlToImage from "html-to-image";

export async function downloadStatBlock(
  element: HTMLElement | null,
  name: string,
) {
  if (!element) {
    return;
  }
  try {
    removeUiStyles(element);
    const dataURL = await htmlToImage.toPng(element, {
      pixelRatio: 2,
    });
    saveAs(dataURL, `${name}_stat_block.png`);
    restoreUiStyles(element);
  } catch (error) {
    console.error(error);
  }
}
export async function downloadRoleplayStats(
  element: HTMLElement | null,
  name: string,
) {
  if (!element) {
    return;
  }
  try {
    removeUiStyles(element);
    const dataURL = await htmlToImage.toPng(element, {
      pixelRatio: 2,
    });
    saveAs(dataURL, `${name}_roleplay_stats.png`);
    restoreUiStyles(element);
  } catch (error) {
    console.error(error);
  }
}
export async function downloadSheet(element: HTMLElement | null, name: string) {
  if (!element) {
    return;
  }
  try {
    removeUiStyles(element);
    const dataURL = await htmlToImage.toPng(element);
    saveAs(dataURL, `${name}_sheet.png`);
    restoreUiStyles(element);
  } catch (error) {
    console.error(error);
  }
}

export function removeUiStyles(node: HTMLElement) {
  const underline = node.querySelectorAll(".underline");
  if (underline) {
    underline.forEach((element) =>
      element.classList.replace("underline", "underline-placeholder"),
    );
  }
  const dotted = node.querySelectorAll(".dotted");
  if (dotted) {
    dotted.forEach((element) =>
      element.classList.replace("dotted", "dotted-placeholder"),
    );
  }
  const rollUnderline = node.querySelectorAll(".roll-underline");
  if (rollUnderline) {
    rollUnderline.forEach((element) =>
      element.classList.replace("roll-underline", "roll-underline-placeholder"),
    );
  }
  const elementsToHide = node.querySelectorAll(".hide-from-exports");
  if (elementsToHide) {
    elementsToHide.forEach((element) => element.classList.add("sr-only"));
  }
}

export function restoreUiStyles(node: HTMLElement) {
  const underline = node.querySelectorAll(".underline-placeholder");
  if (underline) {
    underline.forEach((element) =>
      element.classList.replace("underline-placeholder", "underline"),
    );
  }
  const dotted = node.querySelectorAll(".dotted-placeholder");
  if (dotted) {
    dotted.forEach((element) =>
      element.classList.replace("dotted-placeholder", "dotted"),
    );
  }
  const rollUnderline = node.querySelectorAll(".roll-underline-placeholder");
  if (rollUnderline) {
    rollUnderline.forEach((element) =>
      element.classList.replace("roll-underline-placeholder", "roll-underline"),
    );
  }
  const elementsToHide = node.querySelectorAll(".hide-from-exports");
  if (elementsToHide) {
    elementsToHide.forEach((element) => element.classList.remove("sr-only"));
  }
}

export function saveAs(uri: string, filename: string) {
  const link = document.createElement("a");

  if (typeof link.download === "string") {
    link.href = uri;
    link.download = filename;

    // Firefox requires the link to be in the body
    document.body.appendChild(link);

    // simulate click
    link.click();

    // remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}
