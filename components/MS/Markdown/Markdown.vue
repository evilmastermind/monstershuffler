<template>
  <div ref="test" contenteditable="true" class="markdown-container">
    <MSMarkdownFragment
      v-for="(fragment, index) in lines"
      :key="index"
      @input="handleInput"
      @keydown.enter="handleInput"
    >
      {{ line.text }}
    </M>
  </div>
</template>

<script setup lang="ts">
import { useMutationObserver } from "@vueuse/core";

const text = defineModel({ type: String });

const lines = ref<{ text: string }[]>([]);
const test = ref(null);
console.log(test);


function handleInput(event) {
  const newText = event.target.innerText;
  console.log("Content changed:", newText);
}

useMutationObserver(
  test,
  (mutations) => {
    console.log("Mutations observed");
    if (mutations[0]) console.log(mutations[0].attributeName);
  },
  { attributes: true, childList: true, subtree: true, characterData: true }
);

watch(
  text,
  (value) => {
    if (!value) {
      return;
    }
    lines.value = [];
    value.split("\n").forEach((line) => lines.value.push({ text: line }));
  },
  { immediate: true }
);
</script>

<style scoped>
.markdown-container:focus {
  outline: none;
}
</style>
