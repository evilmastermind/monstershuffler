<template>
  <MSMenuList>
    <MSMenuItem
      :label="$t('monsterSheet.downloadStatBlockAsImage')"
      icon="fa6-solid:image"
      @click="downloadStatBlock"
    />
    <MSMenuItem
      :label="$t('monsterSheet.downloadSheetAsImage')"
      icon="fa6-solid:image"
      @click="downloadSheet"
    />
    <MSMenuItem
      disabled
      :label="$t('monsterSheet.downloadSheetAsPdf')"
      icon="teenyicons:pdf-solid"
      @click="downloadSheet"
    />
    <MSMenuItem
      disabled
      :label="$t('monsterSheet.createToken')"
      icon="f7:person-alt-circle-fill"
      @click="downloadSheet"
    />
  </MSMenuList>
</template>

<script setup lang="ts">
import * as htmlToImage from "html-to-image";
/** import html2canvas from "html2canvas";
 *
 * html2canvas sucks because it can't render images properly,
 * and does not support css masks.
 *
 * two solutions are possible and need to be tested:
 * - dom-to-image seem to have mask support (see this commit: https://github.com/marcomanenti22/dom-to-image)
 * - html-to-image doesn't have a mask support yet but they're working on it (https://github.com/bubkoo/html-to-image/pull/382) and there seem to be a pr with a fix for it
 */

const p = defineProps({
  hide: {
    type: Function,
    required: true,
  },
});

const generator = useGeneratorStore();
const {
  currentSheetHTMLElement,
  currentStatBlockHTMLElement,
  currentCharacter,
} = storeToRefs(generator);

const characterName = computed(() => {
  if (currentCharacter.value) {
    return (
      currentCharacter.value.statistics?.fullName
        ?.replace(/ /g, "_")
        .toLowerCase() || "character"
    );
  }
  return "";
});

async function downloadStatBlock() {
  if (!currentStatBlockHTMLElement.value) {
    return;
  }
  try {
    removeUiStyles(currentStatBlockHTMLElement.value);
    const dataURL = await htmlToImage.toPng(currentStatBlockHTMLElement.value, {
      pixelRatio: 2,
    });
    saveAs(dataURL, `${characterName.value}_stat_block.png`);
    restoreUiStyles(currentStatBlockHTMLElement.value);
  } catch (error) {
    console.error(error);
  }
}
async function downloadSheet() {
  if (!currentSheetHTMLElement.value) {
    return;
  }
  try {
    removeUiStyles(currentSheetHTMLElement.value);
    const dataURL = await htmlToImage.toPng(currentSheetHTMLElement.value);
    saveAs(dataURL, `${characterName.value}_sheet.png`);
    restoreUiStyles(currentSheetHTMLElement.value);
  } catch (error) {
    console.error(error);
  }
}

function removeUiStyles(node: HTMLElement) {
  const underline = node.querySelectorAll(".underline");
  if (underline) {
    underline.forEach((element) =>
      element.classList.replace("underline", "underline-placeholder")
    );
  }
  const dotted = node.querySelectorAll(".dotted");
  if (dotted) {
    dotted.forEach((element) =>
      element.classList.replace("dotted", "dotted-placeholder")
    );
  }
  const rollUnderline = node.querySelectorAll(".roll-underline");
  if (rollUnderline) {
    rollUnderline.forEach((element) =>
      element.classList.replace("roll-underline", "roll-underline-placeholder")
    );
  }
  const elementsToHide = node.querySelectorAll(".hide-from-exports");
  if (elementsToHide) {
    elementsToHide.forEach((element) => element.classList.add("sr-only"));
  }
}

function restoreUiStyles(node: HTMLElement) {
  const underline = node.querySelectorAll(".underline-placeholder");
  if (underline) {
    underline.forEach((element) =>
      element.classList.replace("underline-placeholder", "underline")
    );
  }
  const dotted = node.querySelectorAll(".dotted-placeholder");
  if (dotted) {
    dotted.forEach((element) =>
      element.classList.replace("dotted-placeholder", "dotted")
    );
  }
  const rollUnderline = node.querySelectorAll(".roll-underline-placeholder");
  if (rollUnderline) {
    rollUnderline.forEach((element) =>
      element.classList.replace("roll-underline-placeholder", "roll-underline")
    );
  }
  const elementsToHide = node.querySelectorAll(".hide-from-exports");
  if (elementsToHide) {
    elementsToHide.forEach((element) => element.classList.remove("sr-only"));
  }
}

function saveAs(uri: string, filename: string) {
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
</script>

<style scoped></style>
