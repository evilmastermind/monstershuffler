<template>
  <div ref="textRef" contenteditable="true">
    <MarkdownLine
      v-for="(line, index) in lines"
      :key="index"
      v-model="line.text"
    />
  </div>
</template>

<script setup lang="ts">
import { useMutationObserver } from "@vueuse/core";

const text = defineModel({ type: String });
const lines = ref<{ text: string }[]>([]);
const textRef = ref(null);

useMutationObserver(
  textRef,
  (mutations) => {
    // const selection = window.getSelection();
    // if (!selection) return;
    // const range = selection.getRangeAt(0);
    // const cursorPos = range.endOffset;
    // console.log("Cursor Position:", cursorPos);
    mutations.forEach((mutation) => {
      console.log(mutation.type, mutation);
      console.log(mutation?.target?.textContent || "(no text)");
    });
    // if (mutations[0]?.target?.textContent) {
    //   console.log(mutations);
    //   text.value = mutations[0].target.textContent;
    // }
  },
  {
    // attributes: true,
    characterData: true,
    // childList: true,
    subtree: true,
  }
);

watch(
  text,
  (value) => {
    console.log("Text changed:", value);
    if (!value) {
      return;
    }
    lines.value = [];
    value.split("\n").forEach((line) => lines.value.push({ text: line }));
  },
  { immediate: true }
);

watch(
  lines,
  (value) => {
    text.value = value.map((line) => line.text).join("\n");
  },
  { deep: true }
);
</script>

<style scoped></style>
